import {HttpException} from "@/app/middlewares/exceptions-middleware";
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {checkToken} from "@/app/middlewares/auth-middleware"


export function checkRole(role: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = checkToken(req, res, next)
    if (token) {
      jwt.verify(token, process.env.SECRET || '', (err, user) => {
        if (err) {
          return next(HttpException.invalidToken());
        }
        if (typeof user === 'string' || !user) {
          return next(HttpException.invalidToken());
        }
        if (user.role !== role) {
          return next(HttpException.forbidden());
        }
        req.user = user;
      });

      next()
    }
  }
}