import * as yup from "yup";
import {NextFunction, Request, Response} from "express";
import {HttpException} from "../exceptions";
import {ValidationError} from "yup";

export const userSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required().nullable(false),
    login: yup.string().min(3).max(10).required().nullable(false),
    password: yup.string().min(3).max(10).required().nullable(false),
  }),
});

export const validatingRegistration =
  (schema: typeof userSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      schema
      .validate({
        body: req.body
      })
      .then(() => {
        next();
      })
      .catch((e) => {
        if (e instanceof ValidationError)
          next(new HttpException(e.errors.join(", "), 400));
      });
    };
