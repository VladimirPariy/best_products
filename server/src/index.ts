import './plugins/modul-alias';
import {Category} from "@/database/models/products/categories";
import {PriceHistory} from "@/database/models/products/price-history";
import {Subcategory} from "@/database/models/products/subcatigories";
import express, {Express} from "express";
import {ErrorHandler} from "@/app/middleware/exceptions";
import {connectingDb} from "@/database/connectingDb";
import {createAuthRouter} from "@/app/auth/auth.router";

import { Product } from '@/database/models/products/product';

const PORT = process.env.PORT || 8000;
const HOST = "localhost";

const createWebServer = (): Express => {
  const app = express();

  // CORS

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use("/api", createAuthRouter());


  app.get('/', async (req, res) => {
    const product = await Product.query().withGraphFetched('comments')

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
