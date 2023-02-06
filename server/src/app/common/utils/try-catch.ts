import { NextFunction, Response, Request } from "express";

export const tryCatch =
  (controller: (req: Request, res: Response) => void) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (e) {
      return next(e);
    }
  };
