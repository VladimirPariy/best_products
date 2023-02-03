import { Router } from "express";
import FeedbacksController from "./feedbacks.controller";

export const createFeedbacksRouter = (): Router => {
  const feedbacksRouter = Router();

  feedbacksRouter.get("/:id", FeedbacksController.getFeedbacksByUserId);
  feedbacksRouter.post("/", FeedbacksController.addFeedback);

  return feedbacksRouter;
};
