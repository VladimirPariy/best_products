import { Response, Request } from "express";
import { viewSchema } from "../common/validations/view-validation";
import ViewService from "./view.service";

const instanceViewService = ViewService.getInstance();

export default class ViewController {
  async addView(req: Request, res: Response) {
    const { productId } = await viewSchema.validate(req.body);
    const view = await instanceViewService.addView(productId);

    res.status(200).send({ productId: view.product });
  }

  //singleton
  private static instance: ViewController;
  private constructor() {}
  public static getInstance(): ViewController {
    if (!ViewController.instance) {
      ViewController.instance = new ViewController();
    }
    return ViewController.instance;
  }
}
