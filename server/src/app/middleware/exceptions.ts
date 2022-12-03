import { NextFunction, Request, Response } from "express";

export class HttpException extends Error {
  public status?: number;
  public message: string;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const ErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error)
  if (error instanceof HttpException) {
    return res.status(error.status || 500).send(error.message);
  }
  res.status(500).send(JSON.stringify(error));
};
