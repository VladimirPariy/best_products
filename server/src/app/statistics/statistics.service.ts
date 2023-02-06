import { UsersModel } from "../users/models/users.model";
import { ProductsModel } from "../products/models/products.model";
import ProductService from "../products/product.service";

const instanceProductService = ProductService.getInstance();

class StatisticsService {
  async getNewUsers() {
    return UsersModel.query()
      .select(["user_id", "first_name", "last_name", "email", "phone_number", "created_at"])
      .orderBy("created_at", "DESC")
      .limit(10);
  }

  async getMostViews() {
    return ProductsModel.query()
      .select(["products.product_id", "products.product_title", instanceProductService.getViewsAmount()])
      .orderBy("views_amount", "DESC")
      .limit(10);
  }

  async getMostFavorites() {
    return ProductsModel.query()
      .select(["products.product_id", "products.product_title", instanceProductService.getFavoriteAmount()])
      .orderBy("favorites_amount", "DESC")
      .limit(10);
  }

  async getMostCommented() {
    return ProductsModel.query()
      .select(["products.product_id", "products.product_title", instanceProductService.getCommentsAmount()])
      .orderBy("comments_amount", "DESC")
      .limit(10);
  }

  async getWithHighestAverageRating() {
    const products = await ProductsModel.query().select([
      "products.product_id",
      "products.product_title",
      instanceProductService.getPositiveFeedbacksAmount(),
      instanceProductService.getNegativeFeedbacksAmount(),
    ]);

    function wilson_score(up: number, down: number) {
      if (!up) return -down;
      const n = up + down;
      const z = 1.64485;
      const phat = up / n;
      return (
        (phat + (z * z) / (2 * n) - z * Math.sqrt((phat * (1 - phat) + (z * z) / (4 * n)) / n)) / (1 + (z * z) / n)
      );
    }

    const modifyArray: {
      product_id: number;
      product_title: string;
      positive_feedbacks_amount?: number;
      negative_feedbacks_amount?: number;
      averageRating: number;
    }[] = [];
    products.forEach((item) => {
      modifyArray.push({
        ...item,
        averageRating: wilson_score(item.positive_feedbacks_amount || 0, item.negative_feedbacks_amount || 0),
      });
    });
    modifyArray.sort((a, b) => b.averageRating - a.averageRating);
    modifyArray.length = 10;

    return modifyArray;
  }
}

export default new StatisticsService();
