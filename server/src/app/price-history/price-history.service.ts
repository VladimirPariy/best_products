import { PriceHistoryModel } from "./price-history.model";

class PriceHistoryService {
  async getPriceHistoryByProductId(id: number) {
    return PriceHistoryModel.query().where({ product: id });
  }
}

export default new PriceHistoryService();
