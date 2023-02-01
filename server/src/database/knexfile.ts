import mysql2 from "mysql2";

const options =
  process.env.NODE_ENV === "production"
    ? {
        client: "mysql2",
        connection: {
          host: "us-cdbr-east-06.cleardb.net",
          user: "bef7663cdc31b4",
          password: "b8720109",
          database: "heroku_57e5c38d567e4b6",
        },
      }
    : {
        client: "mysql2",
        connection: {
          host: "127.0.0.1",
          port: 3306,
          user: "test-user",
          password: "password",
          database: "best_products",
          charset: "utf8",
        },
      };

module.exports = {
  development: options,
};
