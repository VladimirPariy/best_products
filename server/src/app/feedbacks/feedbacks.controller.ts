import { Response, Request, NextFunction } from "express";

import { HttpException } from "@/app/common/errors/exceptions";
import FeedbacksService from "@/app/feedbacks/feedbacks.service";

class FeedbacksController {
  async getFeedbacksByUserId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id || isNaN(+id)) {
      return next(HttpException.badRequest("User id is missing or invalid"));
    }
    const data = await FeedbacksService.getFeedbacksByUserId(+id);
    // data instanceof HttpException ? next(data) :
    res.status(200).send(data);
  }
}

export default new FeedbacksController();
