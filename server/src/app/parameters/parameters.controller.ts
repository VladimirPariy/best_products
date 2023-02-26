import { paramsSchema } from "../common/validations/params-validation";
import { Response, Request } from "express";
import ParametersService from "./parameters.service";

const instanceParametersService = ParametersService.getInstance();

export default class ParametersController {
  async getAllParameters(req: Request, res: Response) {
    const data = await instanceParametersService.getAllParameters();
    res.status(200).send(data);
  }

  async getParametersBySubcategoryId(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);
    const data = await instanceParametersService.getParametersBySubcategoryId(id);
    res.status(200).send(data);
  }

  //singleton
  private static instance: ParametersController;
  private constructor() {}
  public static getInstance(): ParametersController {
    if (!ParametersController.instance) {
      ParametersController.instance = new ParametersController();
    }
    return ParametersController.instance;
  }
}
