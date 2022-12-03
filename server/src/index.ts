import express, {Express} from "express";

import {cors} from "./app/middleware/cors";
import {ErrorHandler} from "./app/middleware/exceptions";

import {setupDB} from "./database/setupDB";

import {createAuthRouter} from "./app/auth/auth.router";

const PORT = process.env.PORT || 5000;
const HOST = "localhost";

const createWebServer = (): Express => {
  const app = express();
  setupDB();
  app.use(cors);
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use("/api", createAuthRouter());

  const version = "1.0.0"
  app.get('/', (req, res) => res.send({version}))

  app.use(ErrorHandler);
  return app;
};

const start = async (app: Express) => {
  app.listen(PORT);
  console.info(`Server started and running on https://${HOST}:${PORT}`);
};

start(createWebServer()).catch(e => {
  if (e instanceof Error) console.error(e.message);
});
