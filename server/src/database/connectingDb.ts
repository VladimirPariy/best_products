import knex from "knex";
import { Model } from "objection";
import { development } from "./knexfile";

const connectingDb = () => {
  const db = knex(development);
  Model.knex(db);
};

export { connectingDb };

export const knexInstance = knex(development);
