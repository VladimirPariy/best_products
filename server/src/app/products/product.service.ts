import Objection from "objection";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fileUpload, { UploadedFile } from "express-fileupload";
import { Request } from "express";

import {
  IInfoForCreateProduct,
  IPriceHistory,
  IProductImage,
  IProductSubcategory,
  IUpdatingProductFields,
} from "@/app/products/product.interfaces";
import { HttpException } from "@/app/common/errors/exceptions";
import { ProductsModel } from "@/app/products/models/products.model";
import { CategoriesModel } from "@/app/categories/models/categories.model";
import { SubcategoryModel } from "@/app/categories/models/subcatigories.model";
import { ProductsImagesModel } from "@/app/products/models/products-images.model";
import { TempImagesModel } from "@/app/products/models/temp-images.model";
import { ProductSubcategoryModal } from "@/app/categories/models/product-subcategories.model";
import { ProductCharacteristicModel } from "@/app/characteristics/models/product-characteristics.model";
import { knexInstance } from "@/database/connectingDb";

class ProductService {
  getProductOrProducts(): Objection.QueryBuilder<
    ProductsModel,
    ProductsModel[]
  >;
  getProductOrProducts(
    id: number[],
    comment?: boolean,
    withOutFilters?: boolean
  ): Objection.QueryBuilder<ProductsModel, ProductsModel[]>;
  getProductOrProducts(
    id: number,
    comment?: boolean,
    withOutFilters?: boolean
  ): Objection.QueryBuilder<ProductsModel, ProductsModel | undefined>;
  getProductOrProducts(
    id?: number | number[],
    comment?: boolean,
    withOutFilters?: boolean
  ) {
    const expr =
      "[product_images(selectShotImage), characteristics(selectShotCharacteristic).[parameters(selectShotParameter)], subcategories(selectShotSubcategory).[categories(selectShotCategory)]]";
    const exprWithOutFilters =
      "[product_images, characteristics.[parameters], subcategories.[categories]]";

    const colArray = [
      "products.*",
      this.getFavoriteAmount(),
      this.getViewsAmount(),
      this.getNegativeFeedbacksAmount(),
      this.getPositiveFeedbacksAmount(),
    ];
    if (comment) {
      colArray.push(this.getCommentsAmount());
    }

    if (!id) {
      return ProductsModel.query()
        .select(colArray)
        .withGraphJoined(withOutFilters ? exprWithOutFilters : expr);
    } else if (Array.isArray(id)) {
      return ProductsModel.query()
        .findByIds(id)
        .select(colArray)
        .withGraphFetched(withOutFilters ? exprWithOutFilters : expr);
    } else {
      return ProductsModel.query()
        .findById(id)
        .select(colArray)
        .withGraphFetched(withOutFilters ? exprWithOutFilters : expr);
    }
  }

  getFavoriteAmount() {
    return ProductsModel.relatedQuery("favorite_products")
      .count()
      .as("favorites_amount");
  }

  getViewsAmount() {
    return ProductsModel.relatedQuery("views").count().as("views_amount");
  }

  getPositiveFeedbacksAmount() {
    return ProductsModel.relatedQuery("feedbacks")
      .count()
      .as("positive_feedbacks_amount")
      .where({ feedback_type: 2 });
  }

  getNegativeFeedbacksAmount() {
    return ProductsModel.relatedQuery("feedbacks")
      .count()
      .as("negative_feedbacks_amount")
      .where({ feedback_type: 1 });
  }

  getCommentsAmount() {
    return ProductsModel.relatedQuery("comments").count().as("comments_amount");
  }

  async getAllProducts() {
    const products = await ProductsModel.query().withGraphFetched(
      "[product_images, characteristics.[parameters]]"
    );
    if (!products.length) {
      return HttpException.internalServErr(
        "Unsuccessful selecting data from table"
      );
    }
    return products;
  }

  async getProductDetailsById(id: number | string) {
    if (!id) {
      return HttpException.badRequest("Missing product id");
    }

    const product = await this.getProductOrProducts(+id, true, true);

    if (!product) {
      return HttpException.internalServErr(
        `Unsuccessful selecting data into table`
      );
    }

    return product;
  }

  async removeOneProduct(id: string) {
    if (!id) {
      return HttpException.badRequest("Missing product id");
    }
    const product = await ProductsModel.query().findById(id);
    if (product && Object.keys(product).length) {
      await product.$relatedQuery("price_history").del();
      await product.$relatedQuery("product_images").del();
      await product.$relatedQuery("product_characteristics").del();
      await product.$relatedQuery("product_subcategory").del();
      await product.$relatedQuery("comments").del();
      await product.$relatedQuery("feedbacks").del();
      await product.$relatedQuery("favorite_products").del();
      await product.$relatedQuery("views").del();
      await product.$query().del();
    } else {
      return HttpException.notFound(`Product not found`);
    }
    return { productId: id };
  }

  async createNewProduct(body: IInfoForCreateProduct) {
    const {
      category,
      subcategory,
      productTitle,
      productDescription,
      price,
      characteristics,
      images,
    } = body;
    if (
      !category ||
      !subcategory ||
      !productTitle ||
      !productDescription ||
      !price ||
      characteristics.length < 3 ||
      images.length < 3
    ) {
      return HttpException.badRequest("Missing required fields");
    }

    const modifyCharacteristicsObject = (
      JSON.parse(characteristics) as number[]
    ).map((item) => ({ characteristic: item }));

    const modifyImagesObject = (JSON.parse(images) as IProductImage[]).map(
      (img) => {
        const { original_title, image_title, size } = img;
        return { original_title, image_title, size };
      }
    );
    const price_history: IPriceHistory = { price_at_timestamp: +price };
    const product_subcategory: IProductSubcategory = {
      subcategory: +subcategory,
    };

    const prod = await ProductsModel.query().insertGraph({
      product_title: productTitle,
      product_description: productDescription,
      price: +price,
      price_history: [price_history],
      product_images: modifyImagesObject,
      product_subcategory: [product_subcategory],
      product_characteristics: modifyCharacteristicsObject,
    });

    await TempImagesModel.query().del();

    return ProductsModel.query()
      .withGraphFetched("product_images")
      .withGraphFetched("product_characteristics")
      .where("product_id", prod.$id());
  }

  async uploadTempImages(file: fileUpload.FileArray | null | undefined) {
    if (!file) {
      return HttpException.badRequest("Missing file");
    }
    if (Object.keys(file).length > 1) {
      return HttpException.badRequest("Upload one file");
    }

    for (const img in file) {
      const fileName = `${uuidv4()}.jpg`;
      await (file[img] as UploadedFile).mv(
        path.resolve(__dirname, "..", "..", "static", fileName)
      );

      const image = await TempImagesModel.query().insert({
        size: (file[img] as UploadedFile).size,
        original_title: (file[img] as UploadedFile).name,
        image_title: fileName,
      });
      if (!Object.keys(image).length) {
        return HttpException.internalServErr(
          `Unsuccessful inserting data into table`
        );
      }

      return image;
    }
  }

  async removeTempImages(id: number) {
    const removed = await TempImagesModel.query().del().where({ image_id: id });
    return { removed };
  }

  async updateOneProduct(id: string, { body }: Request) {
    if (!id && !isNaN(+id)) {
      return HttpException.badRequest("Missing product id");
    }
    const allowedFields = [
      "product_subcategory",
      "category",
      "product_title",
      "product_description",
      "price",
      "product_characteristics",
    ];

    let productInfo = {} as IUpdatingProductFields;
    for (const field in body) {
      if (allowedFields.includes(field)) {
        productInfo = { ...productInfo, [field]: body[field] };
      }
    }

    if (!Object.keys(productInfo).length) {
      return HttpException.badRequest("You missed fields for update");
    }

    if (productInfo.product_subcategory) {
      const updateSubcategory = await ProductSubcategoryModal.query()
        .update({ subcategory: productInfo.product_subcategory })
        .where("product", id);
      if (!updateSubcategory) {
        return HttpException.internalServErr(
          `Unsuccessful updating subcategory into table`
        );
      }
    }
    if (
      productInfo.product_description ||
      productInfo.product_title ||
      productInfo.price
    ) {
      let checkByUndefined = {};
      if (productInfo.product_description) {
        checkByUndefined = {
          ...checkByUndefined,
          product_description: productInfo.product_description,
        };
      }
      if (productInfo.product_title) {
        checkByUndefined = {
          ...checkByUndefined,
          product_title: productInfo.product_title,
        };
      }
      if (productInfo.price) {
        checkByUndefined = { ...checkByUndefined, price: productInfo.price };
      }
      const updateProduct = await ProductsModel.query()
        .update(checkByUndefined)
        .where(ProductsModel.idColumn, id);
      if (!updateProduct) {
        return HttpException.internalServErr(
          `Unsuccessful title, description or price updating into table`
        );
      }
    }

    if (productInfo.product_characteristics) {
      const characteristics: number[] = JSON.parse(
        productInfo.product_characteristics
      );
      const modifyChar = characteristics.map((char) => ({
        product: +id,
        characteristic: char,
      }));

      await ProductCharacteristicModel.query().del().where("product", id);

      const insertNewChar = await knexInstance(
        "product_characteristics"
      ).insert(modifyChar);

      if (!insertNewChar.length) {
        return HttpException.internalServErr(
          `Unsuccessful characteristics updating`
        );
      }
    }

    return `Product was successfully updating`;
  }

  async uploadImage(id: number, file: fileUpload.FileArray | null | undefined) {
    if (!id || !file) {
      return HttpException.badRequest("Missing product id or file");
    }
    if (Object.keys(file).length > 1) {
      return HttpException.badRequest("Upload one file");
    }

    for (const img in file) {
      const fileName = `${uuidv4()}.jpg`;
      await (file[img] as UploadedFile).mv(
        path.resolve(__dirname, "..", "..", "static", fileName)
      );

      const image = await ProductsImagesModel.query().insert({
        product: id,
        size: (file[img] as UploadedFile).size,
        original_title: (file[img] as UploadedFile).name,
        image_title: fileName,
      });
      if (!Object.keys(image).length) {
        return HttpException.internalServErr(
          `Unsuccessful inserting data into table`
        );
      }

      return image;
    }
  }

  async removeImage(id: number) {
    if (!id) {
      return HttpException.badRequest("Missing image id");
    }
    const removed = await ProductsImagesModel.query()
      .del()
      .where({ image_id: id });
    return { removed };
  }

  async getFilteredAndSortedProductsByCategory(
    category: string,
    orderBy: "desc" | "asc",
    page: number,
    limit: number,
    filter: string
  ) {
    if (isNaN(page) || isNaN(limit))
      return HttpException.badRequest("Page or limit not a number");
    const findCategory = await CategoriesModel.query().where({
      category_title: category,
    });
    if (findCategory.length === 0)
      return HttpException.badRequest("No specified category");
    const products = await this.getProductOrProducts()
      .where("subcategories.category", findCategory[0].category_id)
      .orderBy("price", orderBy);

    const price = products.map((product) => product.price);
    const minPrice = Math.min(...price);
    const maxPrice = Math.max(...price);

    const normalizedFilter: {
      selectedParameters: null | string;
      subcategoryId: string | null;
      minPrice: null | string;
      maxPrice: null | string;
    } = JSON.parse(filter);

    const prodAfterFilter = products.filter((product) => {
      const isAppropriate: boolean[] = [];

      normalizedFilter.subcategoryId &&
        isAppropriate.push(
          product.subcategories[0].subcategory_id ===
            +normalizedFilter.subcategoryId
        );

      normalizedFilter.minPrice &&
        isAppropriate.push(product.price >= +normalizedFilter.minPrice);

      normalizedFilter.maxPrice &&
        isAppropriate.push(product.price <= +normalizedFilter.maxPrice);

      if (normalizedFilter.selectedParameters) {
        const arrSelectedParam = normalizedFilter.selectedParameters.split(",");
        const charIds = product.characteristics.map(
          (char) => char.characteristic_id
        );
        isAppropriate.push(
          arrSelectedParam.some((param) => charIds.includes(+param))
        );
      }
      return isAppropriate.every((el) => el);
    });

    const total = prodAfterFilter.length;
    if (page === 1 && limit) {
      if (prodAfterFilter.length > limit) prodAfterFilter.length = limit;
      return {
        result: prodAfterFilter,
        totalElements: total,
        currentPage: +page,
        totalPage: Math.ceil(total / limit),
        orderBy,
        minPrice,
        maxPrice,
      };
    } else {
      return {
        result: prodAfterFilter.slice((page - 1) * limit, +page * limit),
        totalElements: total,
        currentPage: +page,
        totalPage: Math.ceil(total / limit),
        orderBy,
        minPrice,
        maxPrice,
      };
    }
  }

  async searchByProductsAndSubcategories(query: string) {
    const products = await ProductsModel.query()
      .withGraphJoined("product_images")
      .where("products.product_title", "like", `%${query}%`);

    const subcategories = await SubcategoryModel.query().where(
      "subcategory_title",
      "like",
      `%${query}%`
    );
    return { products, subcategories };
  }
}

export default new ProductService();
