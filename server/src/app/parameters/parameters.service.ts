import { HttpException } from "@/app/common/errors/exceptions";
import { SubcategoryModel } from "@/app/categories/models/subcatigories.model";
import { ParametersModel } from "@/app/parameters/parameters.model";

class ParametersService {
  async getParametersBySubcategoryId(id: number) {
    const subcategory = await SubcategoryModel.query().findById(id);
    if (!subcategory)
      return HttpException.internalServErr("Subcategory not found");

    return ParametersModel.query()
      .withGraphJoined("characteristics")
      .where("subcategory", subcategory.subcategory_id);
  }

  async getAllParameters() {
    return ParametersModel.query();
  }
}

export default new ParametersService();
