import { Model } from "objection";
import {SubcategoryModel} from "@/app/categories/models/subcatigories.model";

export class ParametersModel extends Model {
	parameter_id:number;
	subcategory:number;
	parameter_title:string;
	
	
	static get tableName() {
		return "parameters";
	}
	
	static get idColumn() {
		return "parameter_id";
	}
	
	static get relationMappings() {
		return {
			subcategory: {
				relation: Model.HasOneRelation,
				modelClass: SubcategoryModel,
				join: {
					from: "parameters.subcategory",
					to: "subcategories.subcategory_id",
				},
			},
			
		};
	}
}
