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
  let password;

  if (role === '2') password = faker.helpers.arrayElement(['user1']);
  else password = faker.helpers.arrayElement(['admin']);

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
  for (let i = 0; i < 20; i++) {
    arr.push(createRandomUser(i));
  }
  return arr;
}