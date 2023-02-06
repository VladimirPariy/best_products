import mysql2 from "mysql2";

const options =
  process.env.NODE_ENV === "production"
    ? {
        client: "mysql2",
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB,
        },
      }
    : {
        client: "mysql2",
        connection: {
          host: process.env.DB_HOST || "127.0.0.1",
          port: process.env.DB_PORT || 3306,
          user: process.env.DB_USER || "test-user",
          password: process.env.DB_PASSWORD || "password",
          database: process.env.DB || "best_products",
          charset: process.env.CHARSET || "utf8",
        },
      };

module.exports = {
  development: options,
};
