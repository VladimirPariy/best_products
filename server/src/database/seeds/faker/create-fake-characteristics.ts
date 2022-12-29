import {faker} from "@faker-js/faker";

const addFakeCharacteristic = (i: number, id: number) => {
	const characteristic_title = faker.lorem.words(2)
	
	return {
		characteristic_id: id,
		characteristic_title,
		parameter: i
	};
};

export const createCharacteristics = () => {
	let arr = [];
	let index = 1;
	for (let i = 1; i <= 36; i++) {
		for (let k = 0; k < 5; k++) {
			arr.push(addFakeCharacteristic(i, index))
			index++
		}
	}
	return arr;
};

