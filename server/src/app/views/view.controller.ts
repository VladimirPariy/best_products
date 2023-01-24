import { Response, Request, NextFunction } from "express";

import { HttpException } from "@/app/common/errors/exceptions";
import ViewService from "@/app/views/view.service";

class ViewController {
  async addView(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.body;
    console.log(req.body);
    if (!productId || isNaN(+productId)) {
      return next(HttpException.badRequest("Product id missing or invalid"));
    }
    const data = await ViewService.addView(+productId);
    // data instanceof HttpException ? next(data) :
    res.status(200).send(data);
  }
}

export default new ViewController();
