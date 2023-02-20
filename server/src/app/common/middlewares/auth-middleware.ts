import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import { HttpException } from "../errors/exceptions";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(HttpException.unauthorized(`User is not authorized`));
  }
  return token;
};

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = checkToken(req, res, next);
  if (token) {
    jwt.verify(token, process.env.SECRET || "", (err, user) => {
      if (err) return next(HttpException.forbidden("Token is invalid"));
      req.user = user;
    });

    next();
  }
};
