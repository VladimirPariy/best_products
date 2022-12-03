import knex from "knex";
import { Model } from "objection";
const { development } = require("./knexfile");

export const setupDB = () => {
  const db = knex(development);
  Model.knex(db);
};
