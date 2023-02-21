import { ViewsModel } from "./views.model";

export default class ViewService {
  async addView(productId: number) {
    const view = await ViewsModel.query().insert({ product: productId });
    return { productId: view.product };
  }

  //singleton
  private static instance: ViewService;
  private constructor() {}
  public static getInstance(): ViewService {
    if (!ViewService.instance) {
      ViewService.instance = new ViewService();
    }
    return ViewService.instance;
  }
}
