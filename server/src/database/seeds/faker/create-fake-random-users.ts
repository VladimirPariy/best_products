import {faker} from '@faker-js/faker';
import bcrypt from "bcryptjs";

const createRandomUser = (i: number) => {
	const sex = faker.name.sexType();
	const first_name = faker.name.firstName(sex);
	const last_name = faker.name.lastName();
	const email = faker.internet.email(first_name, last_name);
	const phone_number = faker.phone.number();
	const is_get_update = faker.helpers.arrayElement(['0', '1'])
	const role = faker.helpers.arrayElement(['1', '2']);
	const password = (role === '2') ? faker.helpers.arrayElement(['user1']) : faker.helpers.arrayElement(['admin']);
	
	const encryptedPass = bcrypt.hashSync(password, 7);
	return {
		user_id: i + 1,
		first_name,
		last_name,
		email,
		password: encryptedPass,
		phone_number,
		is_get_update,
		role,
	}
}

export const createUsers = () => {
	let arr = []
	for (let i = 0; i < 200; i++) {
		arr.push(createRandomUser(i));
	}
	const encAdminPass = bcrypt.hashSync('admin', 7)
	const encUserPass = bcrypt.hashSync('user1', 7)
	arr.push({
		user_id: 201,
		first_name: "admin",
		last_name: "admin",
		email: "admin@mail.com",
		password: encAdminPass,
		phone_number: '+0989156326',
		is_get_update: 1,
		role: '1',
	})
	arr.push({
		user_id: 202,
		first_name: "user",
		last_name: "user",
		email: "user@mail.com",
		password: encUserPass,
		phone_number: '+380989156326',
		is_get_update: 2,
		role: '2',
	})
	return arr;
}