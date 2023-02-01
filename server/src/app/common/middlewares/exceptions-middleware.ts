import { HttpException } from "../errors/exceptions";
import { NextFunction, Request, Response } from "express";

export const ErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpException) {
    return res.status(error.status).send({
      message: error.message,
      statusCode: error.status,
    });
  }
  res.status(500).send(JSON.stringify(error));
};
