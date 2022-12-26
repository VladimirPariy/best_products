import {Response, Request, NextFunction} from "express";

import UserService from "@/app/users/user.service";
import {HttpException} from "@/app/common/errors/exceptions";


class UserController {
	
	async getAllUsers(req: Request, res: Response, next: NextFunction) {
		const data = await UserService.getAllUsers()
		data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
	
	async getAllRoles(req: Request, res: Response, next: NextFunction) {
		const data = await UserService.getRoles()
		data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
	
	async getUserInfo(req: Request, res: Response, next: NextFunction) {
		const {id} = req.user;
		if (!id) {
			return next(HttpException.badRequest(`User\`s id not specified`));
		}
		const data = await UserService.getUserById(id)
		data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
	
	async updateUserInfo(req: Request, res: Response, next: NextFunction) {
		const {id} = req.user;
		if (!id) {
			return next(HttpException.badRequest(`User\`s id not specified`));
		}
		const data = await UserService.updateUserById(id, req)
		data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
	
	async getNewToken(req: Request, res: Response, next: NextFunction) {
		const {id} = req.user;
		if (!id) {
			return next(HttpException.badRequest(`User\`s id not specified`));
		}
		const data = await UserService.createNewToken(id)
		data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
	
	async updateRole(req: Request, res: Response, next: NextFunction) {
		const {id} = req.params
		const {role} = req.body
		const data = await UserService.updateUserRoleById(+id, +role);
		data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
	
	async removeUser(req: Request, res: Response, next: NextFunction) {
		const {id} = req.params;
		const data = await UserService.removeOneById(id);
		data instanceof HttpException ? next(data) : res.status(200).send(data);
	}
}

export default new UserController();