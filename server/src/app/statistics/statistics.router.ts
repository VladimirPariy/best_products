import { Router } from "express";
import StatisticsController from "../statistics/statistics.controller";

export const createStatisticsRouter = (): Router => {
  const statisticsRouter = Router();

  statisticsRouter.get("/users", StatisticsController.getNewUsers);
  statisticsRouter.get("/views", StatisticsController.getMostViewsProducts);
  statisticsRouter.get("/rating", StatisticsController.getProductsWithHighestAverageRating);
  statisticsRouter.get("/favorites", StatisticsController.getMostFavoritesProducts);
  statisticsRouter.get("/comments", StatisticsController.getMostCommentedProducts);

  return statisticsRouter;
};
