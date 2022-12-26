import {faker} from '@faker-js/faker';

const createFakeProducts = (i: number) => {
	const product = faker.commerce.productName();
	const price = faker.commerce.price(0, 100000, 2);
	const description = faker.commerce.productDescription();
	
	return {
		product_id: i + 1,
		product_title: product,
		price,
		product_description: description
	}
}


export const createProducts = () => {
	let arr = []
	for (let i = 0; i < 200; i++) {
		arr.push(createFakeProducts(i));
	}
	return arr;
}