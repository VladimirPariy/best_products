import { faker } from "@faker-js/faker";
import { Knex } from "knex";

const addFakeComment = (id: number, knex: Knex) => {
  const ID: number[] = [];
  for (let i = 1; i <= 200; i++) {
    ID.push(i);
  }
  const user = faker.helpers.arrayElement(ID);
  const product = faker.helpers.arrayElement(ID);
  const comment_msg = faker.lorem.words(15);

  return {
    comment_id: id,
    user,
    product,
    comment_msg,
    created_at: knex.fn.now(),
    updated_at: knex.fn.now(),
  };
};

export const createComments = (knex: Knex) => {
  let arr = [];
  for (let i = 1; i <= 200; i++) {
    for (let k = 0; k < 5; k++) {
      arr.push(addFakeComment(+`${i}${k}`, knex));
    }
  }
  return arr;
};
