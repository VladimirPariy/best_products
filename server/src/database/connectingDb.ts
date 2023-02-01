import knex from "knex";
import { Model } from "objection";
const { development } = require("./knexfile");

const connectingDb = () => {
  const db = knex(development);
  Model.knex(db);
};

export { connectingDb };

export const knexInstance = knex(development);
