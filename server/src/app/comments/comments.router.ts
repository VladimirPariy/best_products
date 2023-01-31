import { Router } from "express";
import { EndpointsList } from "../common/enums/endpoints-list";
import { authenticateJWT } from "../common/middlewares/auth-middleware";
import { checkRole } from "../common/middlewares/role-middleware";
import CommentsController from "./comments.controller";

export const createCommentsRouter = (): Router => {
  const commentsRouter = Router();

  commentsRouter.get(
    EndpointsList.COMMENTS_BY_PRODUCT_ID,
    CommentsController.getCommentsByProductId
  );
  commentsRouter.post(
    EndpointsList.COMMENTS,
    authenticateJWT,
    CommentsController.createComment
  );
  commentsRouter.delete(
    EndpointsList.COMMENT_BY_ID,
    [checkRole("1"), authenticateJWT],
    CommentsController.removeCommentById
  );

  return commentsRouter;
};
