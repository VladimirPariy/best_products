import mysql2 from "mysql2";

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "test-user",
      password: "password",
      database: "best_products",
      charset: "utf8",
    },
    debug: true,
  },
  staging: {},
  production: {},
};
