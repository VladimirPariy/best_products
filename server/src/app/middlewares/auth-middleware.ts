import {Response, NextFunction, Request} from "express"
import jwt from "jsonwebtoken";

import {HttpException} from "@/app/middlewares/exceptions-middleware";


export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new HttpException(`User not authorized`, 401));
  }
  return token
};


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = checkToken(req, res, next)
  if (token) {
    jwt.verify(token, process.env.SECRET || '', (err, user) => {
      if (err) return next(new HttpException('Token is invalid', 403));
      req.user = user;
    });

    next()
  }
}


// export default JWT();