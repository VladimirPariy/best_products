import { Response, Request, NextFunction } from "express";

import { HttpException } from "../common/errors/exceptions";
import ViewService from "./view.service";

class ViewController {
  async addView(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.body;
    if (!productId || isNaN(+productId)) {
      return next(HttpException.badRequest("Product id missing or invalid"));
    }
    const data = await ViewService.addView(+productId);
    res.status(200).send(data);
  }
}

export default new ViewController();
