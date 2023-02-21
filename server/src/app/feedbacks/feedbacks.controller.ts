import { Response, Request } from "express";

import { HttpException } from "../common/errors/exceptions";
import FeedbacksService from "./feedbacks.service";
import { paramsSchema } from "../common/validations/params-validation";
import { addFeedbackSchema } from "../common/validations/feedback-validation";
import { Feedback } from "../common/enums/Feedback";

const instanceFeedbacksService = FeedbacksService.getInstance();

export default class FeedbacksController {
  async getFeedbacksByUserId(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);

    const data = await instanceFeedbacksService.getFeedbacksByUserId(id);
    res.status(200).send(data);
  }

  async addFeedback(req: Request, res: Response) {
    const payload = await addFeedbackSchema.validate(req.body);
    const { feedbackType, productId, userId } = payload;

    const feedbackId = feedbackType ? Feedback.Positive : Feedback.Negative;
    const insertedFeedback = await instanceFeedbacksService.addFeedback({
      feedbackId,
      productId,
      userId,
    });
    const { user, product } = insertedFeedback;
    if (!user || !product) {
      throw HttpException.internalServErr("Something went wrong");
    }
    const feedback = await instanceFeedbacksService.getFeedbackByUserAndProductID(user, product);

    res.status(200).send(feedback);
  }

  //singleton
  private static instance: FeedbacksController;
  private constructor() {}
  public static getInstance(): FeedbacksController {
    if (!FeedbacksController.instance) {
      FeedbacksController.instance = new FeedbacksController();
    }
    return FeedbacksController.instance;
  }
}
