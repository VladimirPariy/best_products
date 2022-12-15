import './plugins/modul-alias';
import express, {Express} from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import fileUpload from 'express-fileupload';

import {connectingDb} from "@/database/connectingDb";
import {ErrorHandler} from "@/app/middlewares/exceptions-middleware";
import {createRootRouter} from "@/app/common/router/root-router";


dotenv.config()


const PORT = process.env.PORT || 8000;
const HOST = "localhost";

const createWebServer = (): Express => {
  const app = express();

  app.use(cors())

  app.use(express.json());
  app.use(fileUpload({}))
  app.use(express.urlencoded({extended: true}));

  app.use("/api", createRootRouter());

  app.use(ErrorHandler);
  return app;
};

const start = async (app: Express) => {
  app.listen(PORT);
  connectingDb();
  console.info(`Server started and running on http://${HOST}:${PORT}`);
};

start(createWebServer()).catch(e => {
  if (e instanceof Error) console.error(e.message);
});



