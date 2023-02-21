import { Router } from "express";
import FeedbacksController from "./feedbacks.controller";
import { tryCatch } from "../common/utils/try-catch";

export const createFeedbacksRouter = (): Router => {
  const feedbacksRouter = Router();
  const instanceFeedbacksController = FeedbacksController.getInstance();

  feedbacksRouter.get("/:id", tryCatch(instanceFeedbacksController.getFeedbacksByUserId));
  feedbacksRouter.post("/", tryCatch(instanceFeedbacksController.addFeedback));

  return feedbacksRouter;
};
