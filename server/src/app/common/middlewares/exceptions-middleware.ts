import { HttpException } from "../errors/exceptions";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";

export const ErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    return res.status(400).send({
      message: error.errors,
      statusCode: 400,
    });
  }
  if (error instanceof HttpException) {
    return res.status(error.status).send({
      message: error.message,
      statusCode: error.status,
    });
  }
  res.status(500).send(JSON.stringify(error));
};
