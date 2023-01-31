import { ViewsModel } from "./views.model";

class ViewService {
  async addView(productId: number) {
    const view = await ViewsModel.query().insert({ product: productId });
    return { productId: view.product };
  }
}

export default new ViewService();
