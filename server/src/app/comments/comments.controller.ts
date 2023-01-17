import {Response, Request, NextFunction} from "express";

import {HttpException} from "@/app/common/errors/exceptions";
import CommentsService from "@/app/comments/comments.service";

class CommentsController {
	async getCommentById(req: Request, res: Response, next: NextFunction) {
		const {id} = req.params;
		if (isNaN(+id) || !id) {
			return next(HttpException.badRequest('Missing comment id'))
		}
		const data = await CommentsService.getCommentById(+id);
		data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
	
	async createComment(req: Request, res: Response, next: NextFunction) {
		const {productId, userId, message} = req.body;
		if (isNaN(+productId) || isNaN(+userId) || !userId || !productId) {
			return next(HttpException.badRequest('Missing product or user id, or id is invalid'))
		}
		if (!message || message.length < 5) {
			return next(HttpException.badRequest('Comment message cannot be shorter than 5 characters'))
		}
		const data = await CommentsService.createComment(productId, userId, message);
		data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
	
	async removeCommentById(req: Request, res: Response, next: NextFunction) {
		const {id} = req.params;
		if (isNaN(+id) || !id) {
			return next(HttpException.badRequest('Missing comment id'))
		}
		const data = await CommentsService.removeCommentById(+id);
		data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
}

export default new CommentsController();
