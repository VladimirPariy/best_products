import {HttpException} from "@/app/middlewares/exceptions-middleware";
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {checkToken} from "@/app/middlewares/auth-middleware"


function checkRole(role: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = checkToken(req, res, next)
    if (token) {
      jwt.verify(token, process.env.SECRET || '', (err, user) => {
        if (err) {
          return next(new HttpException('Token is invalid', 403));
        }
        if(typeof user !== 'string' && user?.role !== role){
          return next(new HttpException('Entering forbidden', 403));
        }
       req.user = user;
      });

      next()
    }
  }
}