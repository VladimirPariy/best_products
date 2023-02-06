import { Response, Request } from "express";

import { HttpException } from "../common/errors/exceptions";
import CommentsService from "./comments.service";
import { paramsSchema } from "../common/validations/params-validation";
import { createCommentsSchema } from "../common/validations/create-comments-validation";

const instanceCommentsService = CommentsService.getInstance();

export default class CommentsController {
  private static instance: CommentsController;

  private constructor() {}

  public static getInstance(): CommentsController {
    if (!CommentsController.instance) {
      CommentsController.instance = new CommentsController();
    }
    return CommentsController.instance;
  }

  async getCommentsByProductId(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);

    const data = await instanceCommentsService.getCommentsByProductId(id);

    res.status(200).send(data);
  }

  async createComment(req: Request, res: Response) {
    const payload = await createCommentsSchema.validate(req.body);

    const insertedComment = await instanceCommentsService.createComment(payload);
    if (!insertedComment) throw HttpException.internalServErr("Unsuccessful inserting comment into table");

    const data = await instanceCommentsService.getCommentByID(insertedComment.$id());

    res.status(200).send(data);
  }

  async removeCommentById(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);

    const data = await instanceCommentsService.removeCommentById(id);
    if (!data) throw HttpException.notFound("Comment not found");

    res.status(200).send({ id });
  }
}
