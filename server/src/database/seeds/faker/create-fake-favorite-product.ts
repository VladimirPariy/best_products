import { Knex } from "knex";

export const createFavoriteProduct = (knex: Knex) => {
  let arr = [];
  for (let i = 1; i <= 200; i++) {
    for (let k = 1; k <= 10; k++) {
      arr.push({
        user: k * 20,
        product: i,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      });
    }
  }
  return arr;
};
