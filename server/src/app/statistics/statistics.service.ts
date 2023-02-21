import { UsersModel } from "../users/models/users.model";
import { ProductsModel } from "../products/models/products.model";
import ProductService from "../products/product.service";

const instanceProductService = ProductService.getInstance();

export default class StatisticsService {
  async getNewUsers() {
    return UsersModel.query()
      .select(["user_id", "first_name", "last_name", "email", "phone_number", "created_at"])
      .orderBy("created_at", "DESC")
      .limit(10);
  }

  async getMostViews() {
    return ProductsModel.query()
      .select([
        "products.product_id",
        "products.product_title",
        instanceProductService.getViewsAmount(),
      ])
      .orderBy("views_amount", "DESC")
      .limit(10);
  }

  async getMostFavorites() {
    return ProductsModel.query()
      .select([
        "products.product_id",
        "products.product_title",
        instanceProductService.getFavoriteAmount(),
      ])
      .orderBy("favorites_amount", "DESC")
      .limit(10);
  }

  async getMostCommented() {
    return ProductsModel.query()
      .select([
        "products.product_id",
        "products.product_title",
        instanceProductService.getCommentsAmount(),
      ])
      .orderBy("comments_amount", "DESC")
      .limit(10);
  }

  async getAll() {
    return ProductsModel.query().select([
      "products.product_id",
      "products.product_title",
      instanceProductService.getPositiveFeedbacksAmount(),
      instanceProductService.getNegativeFeedbacksAmount(),
    ]);
  }

  // singleton
  private static instance: StatisticsService;
  private constructor() {}
  public static getInstance(): StatisticsService {
    if (!StatisticsService.instance) {
      StatisticsService.instance = new StatisticsService();
    }
    return StatisticsService.instance;
  }
}
