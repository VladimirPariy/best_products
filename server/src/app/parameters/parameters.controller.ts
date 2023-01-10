import { Response, Request, NextFunction } from "express";

import { HttpException } from "@/app/common/errors/exceptions";
import ParametersService from "@/app/parameters/parameters.service";

class ParametersController {
  async getParametersBySubcategoryId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { subcategoryId } = req.params;
    if (!subcategoryId || isNaN(+subcategoryId)) {
      return next(HttpException.badRequest("Missing subcategory id"));
    }
    const data = await ParametersService.getParametersBySubcategoryId(
      +subcategoryId
    );
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }
}

export default new ParametersController();
