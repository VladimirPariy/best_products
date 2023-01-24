import { Router } from "express";
import { EndpointsList } from "@/app/common/enums/endpoints-list";
import FeedbacksController from "@/app/feedbacks/feedbacks.controller";
import { authenticateJWT } from "@/app/common/middlewares/auth-middleware";

export const createFeedbacksRouter = (): Router => {
  const feedbacksRouter = Router();

  feedbacksRouter.get(
    EndpointsList.FEEDBACKS_BY_USER_ID,
    // authenticateJWT,
    FeedbacksController.getFeedbacksByUserId
  );

  return feedbacksRouter;
};
