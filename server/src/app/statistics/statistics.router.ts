import { Router } from "express";
import { EndpointsList } from "@/app/common/enums/endpoints-list";
import StatisticsController from "@/app/statistics/statistics.controller";
import { authenticateJWT } from "@/app/common/middlewares/auth-middleware";
import { checkRole } from "@/app/common/middlewares/role-middleware";

export const createStatisticsRouter = (): Router => {
  const statisticsRouter = Router();

  statisticsRouter.get(
    EndpointsList.NEW_USERS,
    [checkRole("1"), authenticateJWT],
    StatisticsController.getNewUsers
  );
  statisticsRouter.get(
    EndpointsList.MOST_VIEWS,
    [checkRole("1"), authenticateJWT],
    StatisticsController.getMostViewsProducts
  );
  statisticsRouter.get(
    EndpointsList.HIGHEST_AVERAGE_RATING,
    [checkRole("1"), authenticateJWT],
    StatisticsController.getProductsWithHighestAverageRating
  );
  statisticsRouter.get(
    EndpointsList.MOST_FAVORITES,
    [checkRole("1"), authenticateJWT],
    StatisticsController.getMostFavoritesProducts
  );
  statisticsRouter.get(
    EndpointsList.MOST_COMMENTED,
    [checkRole("1"), authenticateJWT],
    StatisticsController.getMostCommentedProducts
  );

  return statisticsRouter;
};
