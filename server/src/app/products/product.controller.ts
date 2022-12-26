import {Response, Request, NextFunction} from "express";

import {HttpException} from "@/app/common/errors/exceptions";
import ProductService from "@/app/products/product.service";

class ProductController {
	async getAllProducts(req: Request, res: Response, next: NextFunction) {
		const data = await ProductService.getAllProducts()
		data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
	
	async createNewProduct(req: Request, res: Response, next: NextFunction) {
		const data = await ProductService.createNewProduct(req.body, req.files)
		data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
	
	async updateProduct(req: Request, res: Response, next: NextFunction) {
		const {id} = req.params;
		// const data = await ProductService.updateOneProduct(id, req.body, req.files);
		// data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
	
	async removeProduct(req: Request, res: Response, next: NextFunction) {
		const {id} = req.params;
		const data = await ProductService.removeOneProduct(id);
		data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
	
	async getOneProduct(req: Request, res: Response, next: NextFunction) {
		const {id} = req.params;
		// const data = await ProductService.;
		// data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
}

export default new ProductController();
