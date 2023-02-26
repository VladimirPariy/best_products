import Objection from "objection";
import { ICreateProduct, IFieldsForUpdateProduct } from "./product.interfaces";
import { ProductsModel } from "./models/products.model";
import { SubcategoryModel } from "../categories/models/subcatigories.model";
import { ProductsImagesModel } from "./models/products-images.model";
import { TempImagesModel } from "./models/temp-images.model";
import { OrderBy } from "../common/enums/OrderBy";

export default class ProductService {
  getProductOrProducts(): Objection.QueryBuilder<ProductsModel, ProductsModel[]>;
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
  getProductOrProducts(id?: number | number[], comment?: boolean, withoutFilters?: boolean) {
    const expr =
      "[product_images(selectShotImage), characteristics(selectShotCharacteristic).[parameters(selectShotParameter)], subcategories(selectShotSubcategory).[categories(selectShotCategory)]]";
    const exprWithoutFilters =
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

    const filter = withoutFilters ? exprWithoutFilters : expr;

    if (!id) {
      return ProductsModel.query().select(colArray).withGraphJoined(filter);
    } else if (Array.isArray(id)) {
      return ProductsModel.query().findByIds(id).select(colArray).withGraphFetched(filter);
    } else {
      return ProductsModel.query().findById(id).select(colArray).withGraphFetched(filter);
    }
  }

  getFavoriteAmount() {
    return ProductsModel.relatedQuery("favorite_products").count().as("favorites_amount");
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
    return ProductsModel.query().withGraphFetched("[product_images, characteristics.[parameters]]");
  }

  async getProductDetailsById(id: number) {
    const data = await this.getProductOrProducts(id, true, true);
    return data ? data : [];
  }

  async removeOneProduct(id: number) {
    return ProductsModel.query().deleteById(id);
  }

  async createNewProduct(payload: ICreateProduct) {
    return ProductsModel.query().insertGraph(payload);
  }
  async getNewProduct(id: number) {
    return ProductsModel.query()
      .withGraphFetched("product_images")
      .withGraphFetched("product_characteristics")
      .where("product_id", id);
  }

  async uploadTempImages(file: Express.Multer.File) {
    const { size, originalname, filename } = file;
    return TempImagesModel.query().insert({
      size,
      original_title: originalname,
      image_title: filename,
    });
  }

  async removeTempImages() {
    return TempImagesModel.query().del();
  }

  async removeTempImage(image_id: number) {
    return TempImagesModel.query().del().where({ image_id });
  }

  async uploadImage(product: number, file: Express.Multer.File) {
    const { size, originalname, filename } = file;
    return ProductsImagesModel.query().insert({
      product,
      size,
      original_title: originalname,
      image_title: filename,
    });
  }

  async removeImage(image_id: number) {
    return ProductsImagesModel.query().del().where({ image_id });
  }

  async searchBySubcategories(query: string) {
    return SubcategoryModel.query().where("subcategory_title", "like", `%${query}%`);
  }

  async searchByProducts(query: string) {
    return ProductsModel.query()
      .withGraphJoined("product_images")
      .where("products.product_title", "like", `%${query}%`);
  }

  async getProductByCategory(id: number, orderBy: OrderBy) {
    return this.getProductOrProducts()
      .where("subcategories.category", id)
      .orderBy("price", orderBy);
  }

  async updateProduct(fields: IFieldsForUpdateProduct, id: number) {
    return ProductsModel.query().update(fields).where(ProductsModel.idColumn, id);
  }

  //singleton
  private static instance: ProductService;
  private constructor() {}
  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }
}
