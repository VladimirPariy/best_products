import { Router } from "express";
import { EndpointsList } from "@/app/common/enums/endpoints-list";
import { authenticateJWT } from "@/app/common/middlewares/auth-middleware";
import { checkRole } from "@/app/common/middlewares/role-middleware";
import CommentsController from "@/app/comments/comments.controller";

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
