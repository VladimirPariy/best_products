import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpException } from "../errors/exceptions";
import { checkToken } from "./auth-middleware";

export function checkRole(role: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = checkToken(req, res, next);
    if (token) {
      jwt.verify(token, process.env.SECRET || "", (err, user) => {
        if (err) {
          return next(HttpException.badRequest("Token is invalid"));
        }
        if (typeof user === "string" || !user) {
          return next(HttpException.badRequest("Token is invalid"));
        }
        if (user.role.toString() !== role.toString()) {
          return next(HttpException.forbidden("Entering forbidden"));
        }
        req.user = user;
      });

      next();
    }
  };
}
