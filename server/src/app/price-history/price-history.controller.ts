import { Response, Request } from "express";
import { paramsSchema } from "../common/validations/params-validation";
import PriceHistoryService from "./price-history.service";

const instancePriceHistoryService = PriceHistoryService.getInstance();

export default class PriceHistoryController {
  async getPriceHistoryByProductId(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);
    const data = await instancePriceHistoryService.getPriceHistoryByProductId(id);
    res.status(200).send(data);
  }

  //singleton
  private static instance: PriceHistoryController;
  private constructor() {}
  public static getInstance(): PriceHistoryController {
    if (!PriceHistoryController.instance) {
      PriceHistoryController.instance = new PriceHistoryController();
    }
    return PriceHistoryController.instance;
  }
}
