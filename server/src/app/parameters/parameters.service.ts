import { HttpException } from "../common/errors/exceptions";
import { SubcategoryModel } from "../categories/models/subcatigories.model";
import { ParametersModel } from "./parameters.model";

export default class ParametersService {
  async getAllParameters() {
    return ParametersModel.query();
  }

  async getParametersBySubcategoryId(id: number) {
    const subcategory = await SubcategoryModel.query().findById(id);
    if (!subcategory) {
      throw HttpException.internalServErr("Subcategory not found");
    }

    return ParametersModel.query()
      .withGraphJoined("characteristics")
      .where("subcategory", subcategory.subcategory_id);
  }

  //singleton
  private static instance: ParametersService;
  private constructor() {}
  public static getInstance(): ParametersService {
    if (!ParametersService.instance) {
      ParametersService.instance = new ParametersService();
    }
    return ParametersService.instance;
  }
}
