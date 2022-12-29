import { v4 as uuidv4 } from "uuid";
import path from "path";
import fileUpload, { UploadedFile } from "express-fileupload";
import { HttpException } from "@/app/common/errors/exceptions";
import { ProductsModel } from "@/app/products/models/products.model";
import { Request } from "express";
import {
  ICharacteristic,
  IInfoForCreateProduct,
  IPriceHistory,
  IProductImage,
  IProductSubcategory,
  IUpdatingProductFields,
  ProdCharacteristicReq,
} from "@/app/products/product.interfaces";
import { CategoriesModel } from "@/app/categories/models/categories.model";
import { SubcategoryModel } from "@/app/categories/models/subcatigories.model";
import { ProductsImagesModel } from "@/app/products/models/products-images.model";
import { TempImagesModel } from "@/app/products/models/temp-images.model";
import { ProductSubcategoryModal } from "@/app/categories/models/product-subcategories.model";
import { ProductCharacteristicModel } from "@/app/products/models/product-characteristics";
import { knexInstance } from "@/database/connectingDb";

class ProductService {
  async getAllProducts() {
    const products = await ProductsModel.query()
      .withGraphFetched("product_images")
      .withGraphFetched("product_characteristics");
    if (!products.length) {
      return HttpException.internalServErr(
        "Unsuccessful selecting data from table"
      );
    }
    return products;
  }

  async getProductDetailsById(id: number) {
    if (!id) {
      return HttpException.badRequest("Missing product id");
    }
    const product = await ProductsModel.query().findById(id);
    if (!product) {
      return HttpException.internalServErr(
        `Unsuccessful selecting data into table`
      );
    }
    const priceHistory = await product.$relatedQuery("price_history");
    const productImages = await product.$relatedQuery("product_images");
    const productCharacteristics = await product.$relatedQuery(
      "product_characteristics"
    );
    const productSubcategory = (await product.$relatedQuery(
      "subcategories"
    )) as SubcategoryModel[];
    const subCatId = productSubcategory[0].category;
    const productCategory = await CategoriesModel.query().where(
      "categories.category_id",
      "=",
      subCatId
    );

    const prod = {
      ...product,
      price_history: priceHistory,
      product_images: productImages,
      product_characteristics: productCharacteristics,
      product_subcategory: productSubcategory,
      category: productCategory,
    };

    return prod;
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
    return "Product was successfully deleted";
  }

  async createNewProduct(
    body: IInfoForCreateProduct,
    files: fileUpload.FileArray | null | undefined
  ) {
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
      JSON.parse(characteristics) as ICharacteristic[]
    ).map((item) => {
      const { characteristic_description, characteristic_title, ...rest } =
        item;
      return { characteristic_description, characteristic_title };
    });

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
      product_characteristics: modifyCharacteristicsObject,
      product_images: modifyImagesObject,
      price_history: [price_history],
      product_subcategory: [product_subcategory],
    });

    if (!prod) {
      return HttpException.internalServErr(
        `Unsuccessful inserting data into table`
      );
    }

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
      const characteristics: ProdCharacteristicReq[] = JSON.parse(
        productInfo.product_characteristics
      );
      const modifyChar = characteristics.map((char) => {
        return {
          product: +id,
          characteristic_title: char.characteristic_title,
          characteristic_description: char.characteristic_description,
        };
      });

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
}

export default new ProductService();
