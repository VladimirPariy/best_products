import { HttpException } from "../errors/exceptions";
import { Request, Response } from "express";

export const ErrorHandler = (error: unknown, req: Request, res: Response) => {
  if (error instanceof HttpException) {
    return res.status(error.status).send({
      message: error.message,
      statusCode: error.status,
    });
  }
  res.status(500).send(JSON.stringify(error));
};
