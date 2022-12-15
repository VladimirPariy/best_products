import {HttpException} from "@/app/common/errors/exceptions";
import {NextFunction, Request, Response} from "express";

export const ErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error)
  if (error instanceof HttpException) {
    return res.status(error.status).send(
      {
        message: error.message,
        statusCode: error.status
      });
  }
  res.status(500).send(JSON.stringify(error));
};
