import {faker} from '@faker-js/faker';
import {Knex} from "knex";

const addFakeFeedback = (knex: Knex, user_id: number, product_id: number) => {
	const feedback_type = faker.helpers.arrayElement([1, 2]);
	
	return {
		user:user_id,
		product:product_id,
		feedback_type,
		created_at: knex.fn.now(),
		updated_at: knex.fn.now()
	}
}


export const createFeedbacks = (knex: Knex) => {
	let arr = []
	for (let i = 1; i <= 200; i++) {
		for (let k = 1; k <= 50; k++) {
			arr.push(addFakeFeedback(knex, k * 4, i));
		}
	}
	return arr;
};