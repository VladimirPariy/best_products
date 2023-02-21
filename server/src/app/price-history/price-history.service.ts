import { PriceHistoryModel } from "./price-history.model";

export default class PriceHistoryService {
  async getPriceHistoryByProductId(id: number) {
    return PriceHistoryModel.query().where({ product: id });
  }

  //singleton
  private static instance: PriceHistoryService;
  private constructor() {}
  public static getInstance(): PriceHistoryService {
    if (!PriceHistoryService.instance) {
      PriceHistoryService.instance = new PriceHistoryService();
    }
    return PriceHistoryService.instance;
  }
}
