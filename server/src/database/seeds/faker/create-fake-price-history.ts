import {faker} from '@faker-js/faker';
import {Knex} from "knex";

const addFakePriceHistory = (id: number, index: number, knex: Knex) => {
	const price_at_timestamp = faker.commerce.price(0, 100000);
	
	return {
		price_history_id: id,
		product: index,
		price_at_timestamp,
		created_at: knex.fn.now(),
		updated_at: knex.fn.now()
	}
}


export const createPriceHistory = (knex: Knex) => {
	let arr = []
	for (let i = 1; i <= 200; i++) {
		for (let k = 0; k < 5; k++) {
			arr.push(addFakePriceHistory(+`${i}${k}`, i, knex));
		}
	}
	return arr;
};