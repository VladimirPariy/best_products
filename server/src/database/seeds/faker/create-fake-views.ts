import { faker } from "@faker-js/faker";
import { Knex } from "knex";

const addFakeView = (id: number, knex: Knex) => {
  const ID: number[] = [];
  for (let i = 1; i <= 200; i++) {
    ID.push(i);
  }
  const product = faker.helpers.arrayElement(ID);

  return {
    view_id: id,
    product,
    created_at: knex.fn.now(),
    updated_at: knex.fn.now(),
  };
};

export const createViews = (knex: Knex) => {
  let j = 1;
  let arr = [];
  for (let i = 1; i <= 200; i++) {
    for (let k = 0; k < 100; k++) {
      arr.push(addFakeView(j, knex));
      j++;
    }
  }
  return arr;
};
