import './plugins/modul-alias';
import {Categories} from "@/database/models/products/categories";
import {PriceHistory} from "@/database/models/products/price-history";
import {Subcategory} from "@/database/models/products/subcatigories";
import {Users} from "@/database/models/users/users";
import express, {Express} from "express";
import {ErrorHandler} from "@/app/middleware/exceptions";
import {connectingDb} from "@/database/connectingDb";
import {createAuthRouter} from "@/app/auth/auth.router";

import { Products } from '@/database/models/products/products';

const PORT = process.env.PORT || 8000;
const HOST = "localhost";

const createWebServer = (): Express => {
  const app = express();

  // CORS

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use("/api", createAuthRouter());


  app.get('/', async (req, res) => {
    const product = await Users.query().withGraphFetched('products_comments')

    res.json(product)
  })

  app.use(ErrorHandler);
  return app;
};

const start = async (app: Express) => {
  app.listen(PORT);
  connectingDb();
  console.info(`Server started and running on https://${HOST}:${PORT}`);
};

start(createWebServer()).catch(e => {
  if (e instanceof Error) console.error(e.message);
});
