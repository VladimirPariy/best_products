import * as yup from "yup";
import {NextFunction, Request, Response} from "express";
import {HttpException} from "@/app/middlewares/exceptions-middleware";
import {ValidationError} from "yup";

export const signUpSchema = yup.object({
  body: yup.object({
    fistName: yup.string().nullable(false),
    lastName: yup.string().nullable(false),
    email: yup.string().email().nullable(false),
    password: yup.string().min(5).max(25).nullable(false).matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      'Password can only contain Latin letters.'
    ),
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
          next(new HttpException(e.errors.join(", "), 400));
      });
    };
