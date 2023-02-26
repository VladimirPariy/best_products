import { createProductSchema } from "./../common/validations/create-product-validation";
import { Response, Request } from "express";
import { HttpException } from "../common/errors/exceptions";
import { paramsSchema } from "../common/validations/params-validation";
import { ProductsModel } from "./models/products.model";
import {
  IFieldsForUpdateProduct,
  IInsertCharacteristic,
  IPriceHistory,
  IProductImage,
  IProductSubcategory,
} from "./product.interfaces";
import ProductService from "./product.service";
import { searchSchema } from "../common/validations/search-validation";
import { filterSchema } from "../common/validations/filter-validation";
import CategoriesService from "../categories/categories.service";
import { OrderBy } from "../common/enums/OrderBy";
import { updateProductSchema } from "../common/validations/update-product-validation";
import CharacteristicService from "../characteristics/characteristic.service";

const instanceProductService = ProductService.getInstance();
const instanceCategoriesService = CategoriesService.getInstance();
const instanceCharacteristicService = CharacteristicService.getInstance();

export default class ProductController {
  async getAllProducts(req: Request, res: Response) {
    const products = await instanceProductService.getAllProducts();
    res.status(200).send(products);
  }

  async getProductDetailsById(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);
    const data = await instanceProductService.getProductDetailsById(id);

    res.status(200).send(data);
  }

  async removeProduct(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);
    const productId = await instanceProductService.removeOneProduct(id);

    if (!productId) {
      throw HttpException.notFound(`Product not found`);
    }

    res.status(200).send({ productId: id });
  }

  async createNewProduct(req: Request, res: Response) {
    const { characteristics, images, ...rest } = req.body;
    const parsedChars = JSON.parse(characteristics);
    const parsedImgs = JSON.parse(images);
    const { chars, imgs, price, productTitle, productDescription, subcategory } =
      await createProductSchema.validate({ ...rest, chars: parsedChars, imgs: parsedImgs });

    const modifyCharacteristicsObject = chars.map((item) => ({ characteristic: item }));

    const modifyImagesObject: IProductImage[] = imgs.map((img) => {
      const { original_title, image_title, size } = img;
      return { original_title, image_title, size };
    });
    const price_history: IPriceHistory[] = [{ price_at_timestamp: price }];
    const product_subcategory: IProductSubcategory[] = [{ subcategory: subcategory }];

    const prod = await instanceProductService.createNewProduct({
      product_title: productTitle,
      product_description: productDescription,
      price,
      price_history,
      product_images: modifyImagesObject,
      product_subcategory,
      product_characteristics: modifyCharacteristicsObject,
    });

    await instanceProductService.removeTempImages();

    const data = await instanceProductService.getNewProduct(prod.$id());
    res.status(200).send(data);
  }

  async uploadTempImages(req: Request, res: Response) {
    const img = req.file;
    if (!img) {
      throw HttpException.badRequest("Image is missing");
    }

    const data = await instanceProductService.uploadTempImages(img);
    res.status(200).send(data);
  }

  async removeTempImage(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);
    const removed = await instanceProductService.removeTempImage(id);
    res.status(200).send({ removed });
  }

  async uploadImage(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);
    if (!req.file) {
      throw HttpException.badRequest("Image is missing");
    }

    const data = await instanceProductService.uploadImage(id, req.file);
    res.status(200).send(data);
  }

  async removeImage(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);
    const removed = await instanceProductService.removeImage(id);
    res.status(200).send({ removed });
  }

  async searchProductsAndSubcategory(req: Request, res: Response) {
    const { search } = await searchSchema.validate(req.query);

    const products = await instanceProductService.searchByProducts(search);
    const subcategories = await instanceProductService.searchBySubcategories(search);
    res.status(200).send({ products, subcategories });
  }

  async getFilteredProductsByCategory(req: Request, res: Response) {
    const { filter: jsonFilter, ...rest } = req.query;
    const parsedFilter = jsonFilter ? JSON.parse(jsonFilter as string) : null;

    const { page, limit, category, orderBy, filter } = await filterSchema.validate({
      ...rest,
      filter: parsedFilter,
    });

    const findCategory = await instanceCategoriesService.getCategoryByTitle(category);
    if (findCategory.length === 0) {
      throw HttpException.badRequest("No specified category");
    }

    const products = await instanceProductService.getProductByCategory(
      findCategory[0].category_id,
      orderBy as OrderBy
    );

    const price = products.map((product) => product.price);
    const minPrice = Math.min(...price);
    const maxPrice = Math.max(...price);

    const prodAfterFilter = products.filter((product) => {
      const isAppropriate: boolean[] = [];

      filter.subcategoryId &&
        isAppropriate.push(product.subcategories[0].subcategory_id === filter.subcategoryId);
      filter.minPrice && isAppropriate.push(product.price >= filter.minPrice);
      filter.maxPrice && isAppropriate.push(product.price <= filter.maxPrice);

      if (filter.selectedParameters) {
        const selectedParam = filter.selectedParameters.split(",");
        const charIds = product.characteristics.map((char) => char.characteristic_id);
        isAppropriate.push(selectedParam.some((param) => charIds.includes(Number(param))));
      }
      return isAppropriate.every((el) => el);
    });

    const totalElem = prodAfterFilter.length;
    const totalPage = Math.ceil(totalElem / limit);

    let data = {
      totalElements: totalElem,
      currentPage: page,
      totalPage,
      orderBy,
      minPrice,
      maxPrice,
      result: [] as ProductsModel[],
    };

    if (page === 1) {
      if (prodAfterFilter.length > limit) {
        prodAfterFilter.length = limit;
      }
      data = {
        ...data,
        result: prodAfterFilter,
      };
    } else {
      const firstProdInRes = (page - 1) * limit;
      const lastProdInRes = page * limit;
      data = {
        ...data,
        result: prodAfterFilter.slice(firstProdInRes, lastProdInRes),
      };
    }

    res.status(200).send(data);
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);
    // eslint-disable-next-line prefer-const
    let { product_characteristics: jsonChars, ...rest } = req.body;

    const parsedChars = jsonChars ? JSON.parse(jsonChars) : null;
    if (parsedChars) {
      rest = {
        ...rest,
        product_characteristics: parsedChars,
      };
    }

    const {
      price,
      product_characteristics,
      product_description,
      product_subcategory: subcategory,
      product_title,
    } = await updateProductSchema.validate(rest);

    if (subcategory) {
      const updateSubcategory = await instanceCategoriesService.updateSubcategory(subcategory, id);
      if (!updateSubcategory) {
        throw HttpException.internalServErr(`Unsuccessful updating subcategory into table`);
      }
    }
    if (product_description || product_title || price) {
      let checkByUndefined: IFieldsForUpdateProduct = {};
      if (product_description) {
        checkByUndefined = { product_description };
      }
      if (product_title) {
        checkByUndefined = { ...checkByUndefined, product_title };
      }
      if (price) {
        checkByUndefined = { ...checkByUndefined, price };
      }
      const updateProduct = await instanceProductService.updateProduct(checkByUndefined, id);
      if (!updateProduct) {
        throw HttpException.internalServErr(
          `Updating title, description or price in table are unsuccessful`
        );
      }
    }
    if (product_characteristics) {
      const modifyChar: IInsertCharacteristic[] = product_characteristics.map((characteristic) => ({
        product: id,
        characteristic,
      }));

      const removeProductCharacteristics =
        await instanceCharacteristicService.removeProductCharacteristics(id);
      if (!removeProductCharacteristics) {
        throw HttpException.internalServErr("Removing characteristics are unsuccessful");
      }

      const insertNewChar = await instanceCharacteristicService.batchInsertCharacteristics(
        modifyChar
      );

      if (!insertNewChar.length) {
        throw HttpException.internalServErr(`Updating characteristics are unsuccessful `);
      }
    }

    const data = await instanceProductService.getProductOrProducts(id);

    res.status(200).send(data);
  }

  //singleton
  private static instance: ProductController;
  private constructor() {}
  public static getInstance(): ProductController {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }
    return ProductController.instance;
  }
}
