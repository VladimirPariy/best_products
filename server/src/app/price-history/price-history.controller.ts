import { Response, Request } from "express";
import { paramsSchema } from "../common/validations/params-validation";
import PriceHistoryService from "./price-history.service";

const instancePriceHistoryService = PriceHistoryService.getInstance();

class PriceHistoryController {
  private static instance: PriceHistoryController;
  private constructor() {}
  public static getInstance(): PriceHistoryController {
    if (!PriceHistoryController.instance) {
      PriceHistoryController.instance = new PriceHistoryController();
    }
    return PriceHistoryController.instance;
  }

  async getPriceHistoryByProductId(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);
    const data = await instancePriceHistoryService.getPriceHistoryByProductId(id);
    res.status(200).send(data);
  }
}

export default PriceHistoryController;
