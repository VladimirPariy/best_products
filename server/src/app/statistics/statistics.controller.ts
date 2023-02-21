import { Response, Request } from "express";
import StatisticsService from "./statistics.service";
import { wilson_score } from "./util/wilson_score";
import { IProductAverageRating } from "./statistics.interface";

const instanceStatisticsService = StatisticsService.getInstance();

class StatisticsController {
  private static instance: StatisticsController;
  private constructor() {}
  public static getInstance(): StatisticsController {
    if (!StatisticsController.instance) {
      StatisticsController.instance = new StatisticsController();
    }
    return StatisticsController.instance;
  }

  async getNewUsers(req: Request, res: Response) {
    const data = await instanceStatisticsService.getNewUsers();
    res.status(200).send(data);
  }

  async getMostViewsProducts(req: Request, res: Response) {
    const data = await instanceStatisticsService.getMostViews();
    res.status(200).send(data);
  }

  async getMostFavoritesProducts(req: Request, res: Response) {
    const data = await instanceStatisticsService.getMostFavorites();
    res.status(200).send(data);
  }

  async getMostCommentedProducts(req: Request, res: Response) {
    const data = await instanceStatisticsService.getMostCommented();
    res.status(200).send(data);
  }

  async getProductsWithHighestAverageRating(req: Request, res: Response) {
    const feedbacks = await instanceStatisticsService.getAll();

    const productWithAverageRating: IProductAverageRating[] = [];
    feedbacks.forEach((item) => {
      productWithAverageRating.push({
        ...item,
        averageRating: wilson_score(
          item.positive_feedbacks_amount || 0,
          item.negative_feedbacks_amount || 0
        ),
      });
    });
    productWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);
    productWithAverageRating.length = 10;

    res.status(200).send(productWithAverageRating);
  }
}

export default StatisticsController;
