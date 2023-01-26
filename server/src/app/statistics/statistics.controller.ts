import { Response, Request } from "express";
import StatisticsService from "@/app/statistics/statistics.service";

class StatisticsController {
  async getNewUsers(req: Request, res: Response) {
    const data = await StatisticsService.getNewUsers();
    res.status(200).send(data);
  }

  async getMostViewsProducts(req: Request, res: Response) {
    const data = await StatisticsService.getMostViews();
    res.status(200).send(data);
  }

  async getMostFavoritesProducts(req: Request, res: Response) {
    const data = await StatisticsService.getMostFavorites();
    res.status(200).send(data);
  }

  async getMostCommentedProducts(req: Request, res: Response) {
    const data = await StatisticsService.getMostCommented();
    res.status(200).send(data);
  }

  async getProductsWithHighestAverageRating(req: Request, res: Response) {
    const data = await StatisticsService.getWithHighestAverageRating();
    res.status(200).send(data);
  }
}

export default new StatisticsController();
