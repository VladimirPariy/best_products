import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "@/app/common/errors/exceptions";
import { ValidationError } from "yup";

export const signInSchema = yup.object({
  body: yup.object({
    login: yup.string().nullable(false).required(),
    password: yup
      .string()
      .min(5)
      .nullable(false)
      .required()
      .matches(
        /^([A-Za-z0-9]*)$/gi,
        "Password can contain only Latin letters"
      ),
  }),
});

export const validatingSignIn =
  (schema: typeof signInSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    schema
      .validate({
        body: req.body,
      })
      .then(() => {
        next();
      })
      .catch((e) => {
        if (e instanceof ValidationError)
          next(HttpException.badRequest(e.errors.join(", ")));
      });
  };
