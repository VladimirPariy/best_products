import { PriceHistoryModel } from "./price-history.model";

class PriceHistoryService {
  private static instance: PriceHistoryService;
  private constructor() {}
  public static getInstance(): PriceHistoryService {
    if (!PriceHistoryService.instance) {
      PriceHistoryService.instance = new PriceHistoryService();
    }
    return PriceHistoryService.instance;
  }

  async getPriceHistoryByProductId(id: number) {
    return PriceHistoryModel.query().where({ product: id });
  }
}

export default PriceHistoryService;
