import {faker} from '@faker-js/faker';
import {Knex} from "knex";

const addFakeView = (id: number, knex: Knex) => {
	const ID: number[] = [];
	for (let i = 1; i <= 200; i++) {
		ID.push(i)
	}
	const user = faker.helpers.arrayElement(ID);
	const product = faker.helpers.arrayElement(ID);
	
	return {
		view_id: id,
		user,
		product,
		created_at: knex.fn.now(),
		updated_at: knex.fn.now()
	}
}

export const createViews = (knex: Knex) => {
	let j = 0;
	let arr = []
	for (let i = 1; i <= 200; i++) {
		for (let k = 0; k < 500; k++) {
			arr.push(addFakeView(j, knex));
			j++
		}
	}
	return arr;
};