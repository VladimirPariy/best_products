import knex from "knex";
import { Model } from "objection";
const { options } = require("./knexfile");

const connectingDb = () => {
  const db = knex(options);
  Model.knex(db);
};

export { connectingDb };

export const knexInstance = knex(options);
