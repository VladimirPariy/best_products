import {HttpException} from "@/app/common/errors/exceptions";
import {SubcategoryModel} from "@/app/categories/models/subcatigories.model";
import {ParametersModel} from "@/app/parameters/models/parameters.model";

class ParametersService {
	async getParametersBySubcategoryId(id: number) {
		const subcategory = await SubcategoryModel.query().findById(id)
		if (!subcategory) return HttpException.internalServErr('Subcategory not found')
		
		const parameters = await ParametersModel.query().withGraphJoined('characteristics').where('subcategory', subcategory.subcategory_id)
		return parameters
	}
}

export default new ParametersService();
