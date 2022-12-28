import {Model} from "objection";

import {ProductsModel} from "@/app/products/models/products.model";
import {CategoriesModel} from "@/app/categories/models/categories.model";


export class SubcategoryModel extends Model {
	subcategory_id: number;
	category: number;
	subcategory_title: string;
	
	static tableName = "subcategories";
	
	static idColumn = "subcategory_id";
	
	static relationMappings = {
		products: {
			relation: Model.ManyToManyRelation,
			modelClass: ProductsModel,
			join: {
				from: "subcategories.subcategory_id",
				through: {
					from: "product_subcategories.subcategory",
					to: "product_subcategories.product"
				},
				to: "products.product_id"
			}
		},
	}
}




