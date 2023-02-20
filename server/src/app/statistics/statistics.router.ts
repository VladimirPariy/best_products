import { Router } from "express";
import { tryCatch } from "../common/utils/try-catch";
import StatisticsController from "../statistics/statistics.controller";

export const createStatisticsRouter = (): Router => {
  const statisticsRouter = Router();

  const instanceStatisticsController = StatisticsController.getInstance();

  statisticsRouter.get("/users", tryCatch(instanceStatisticsController.getNewUsers));
  statisticsRouter.get("/views", tryCatch(instanceStatisticsController.getMostViewsProducts));
  statisticsRouter.get(
    "/rating",
    tryCatch(instanceStatisticsController.getProductsWithHighestAverageRating)
  );
  statisticsRouter.get(
    "/favorites",
    tryCatch(instanceStatisticsController.getMostFavoritesProducts)
  );
  statisticsRouter.get(
    "/comments",
    tryCatch(instanceStatisticsController.getMostCommentedProducts)
  );

  return statisticsRouter;
};
