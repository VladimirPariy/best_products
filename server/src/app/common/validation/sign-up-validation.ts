import * as yup from "yup";
import {NextFunction, Request, Response} from "express";
import {HttpException} from "@/app/common/errors/exceptions";
import {ValidationError} from "yup";

export const signUpSchema = yup.object({
  body: yup.object({
    firstName: yup.string().min(1).max(20).nullable(false).required(),
    lastName: yup.string().min(1).max(20).nullable(false).required(),
    email: yup.string().min(1).max(50).email().nullable(false).required(),
    password: yup.string().min(5).nullable(false).matches(
      /^([A-Za-z0-9]*)$/gi,
      'Password can only contain Latin letters.'
    ).required(),
    isGetUpdates: yup.boolean().nullable(false)
  }),
});

export const validatingSignUp =
  (schema: typeof signUpSchema) =>
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
          next(HttpException.badRequest(e.errors.join(", ")));
      });
    };
