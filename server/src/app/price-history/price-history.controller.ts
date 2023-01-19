import { Response, Request, NextFunction } from "express";

import { HttpException } from "@/app/common/errors/exceptions";
import PriceHistoryService from "@/app/price-history/price-history.service";

class PriceHistoryController {
  async getPriceHistoryByProductId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    if (isNaN(+id) || !id) {
      return next(HttpException.badRequest("Missing product id"));
    }
    const data = await PriceHistoryService.getPriceHistoryByProductId(+id);
    res.status(200).send(data);
  }
}

export default new PriceHistoryController();
