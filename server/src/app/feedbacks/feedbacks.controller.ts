import { Response, Request, NextFunction } from "express";

import { HttpException } from "../common/errors/exceptions";
import FeedbacksService from "./feedbacks.service";

class FeedbacksController {
  async getFeedbacksByUserId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id || isNaN(+id)) {
      return next(HttpException.badRequest("User id is missing or invalid"));
    }
    const data = await FeedbacksService.getFeedbacksByUserId(+id);
    res.status(200).send(data);
  }

  async addFeedback(req: Request, res: Response, next: NextFunction) {
    const { userId, productId, feedbackType } = req.body;
    if (typeof feedbackType === "undefined" || isNaN(+userId)) {
      return next(HttpException.badRequest("User id is missing or invalid"));
    }
    if (typeof feedbackType === "undefined" || isNaN(+productId)) {
      return next(HttpException.badRequest("Product id is missing or invalid"));
    }
    if (typeof feedbackType === "undefined" || isNaN(+feedbackType)) {
      return next(
        HttpException.badRequest("Feedback type is missing or invalid")
      );
    }
    const data = await FeedbacksService.addFeedback(
      userId,
      productId,
      feedbackType
    );
    res.status(200).send(data);
  }
}

export default new FeedbacksController();
