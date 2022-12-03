import { Model } from "objection";

class Users extends Model {
  _id: string;
  login: string;
  email: string;
  password: string;

  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["login", "email", "password"],

      properties: {
        _id: { type: "integer" },
        login: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

export { Users };
