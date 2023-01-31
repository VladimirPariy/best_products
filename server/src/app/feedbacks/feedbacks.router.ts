import { Router } from "express";
import { EndpointsList } from "../common/enums/endpoints-list";
import FeedbacksController from "./feedbacks.controller";
import { authenticateJWT } from "../common/middlewares/auth-middleware";

export const createFeedbacksRouter = (): Router => {
  const feedbacksRouter = Router();

  feedbacksRouter.get(
    EndpointsList.FEEDBACKS_BY_USER_ID,
    authenticateJWT,
    FeedbacksController.getFeedbacksByUserId
  );
  feedbacksRouter.post(
    EndpointsList.FEEDBACK,
    authenticateJWT,
    FeedbacksController.addFeedback
  );

  return feedbacksRouter;
};
