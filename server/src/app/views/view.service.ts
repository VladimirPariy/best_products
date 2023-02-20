import { ViewsModel } from "./views.model";

class ViewService {
  private static instance: ViewService;

  private constructor() {}

  public static getInstance(): ViewService {
    if (!ViewService.instance) {
      ViewService.instance = new ViewService();
    }
    return ViewService.instance;
  }

  async addView(productId: number) {
    const view = await ViewsModel.query().insert({ product: productId });
    return { productId: view.product };
  }
}

export default ViewService;
