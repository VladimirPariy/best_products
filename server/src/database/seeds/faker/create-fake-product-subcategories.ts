import {faker} from "@faker-js/faker";

const addFakeProductSubcategory = (id: number) => {
	const subcategoryId = [10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25, 30, 31, 32, 33, 34, 35]
	const subcategory = faker.helpers.arrayElement(subcategoryId)
	
	return {
		product: id,
		subcategory: subcategory,
	}
}

export const createProductSubcategories = () => {
	let arr = []
	for (let i = 1; i <= 200; i++) {
		arr.push(addFakeProductSubcategory(i));
	}
	
	return arr;
}