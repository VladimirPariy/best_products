import { EndpointsList } from "./app/common/enums/endpoints-list";
import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import fileUpload from "express-fileupload";

import { connectingDb } from "./database/connectingDb";
import { ErrorHandler } from "./app/common/middlewares/exceptions-middleware";
import { createRootRouter } from "./app/common/root-router";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 8000;
const HOST = "localhost";

const createWebServer = (): Express => {
  const app = express();

  app.use(cors());

  app.use(express.json());
  app.use(express.static(path.resolve(__dirname, "static")));
  app.use(fileUpload({}));
  app.use(express.urlencoded({ extended: true }));

  app.use(EndpointsList.API, createRootRouter());

  app.use(ErrorHandler);
  return app;
};

const start = async (app: Express) => {
  try {
    app.listen(PORT);
    connectingDb();
    console.info(`Server started and running on http://${HOST}:${PORT}`);
  } catch (e) {
    if (e instanceof Error) console.error(e.message);
  }
};

start(createWebServer());
