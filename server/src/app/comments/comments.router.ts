import { Router } from "express";
import { authenticateJWT } from "../common/middlewares/auth-middleware";
import { checkRole } from "../common/middlewares/role-middleware";
import CommentsController from "./comments.controller";
import { Roles } from "../common/enums/Roles";

export const createCommentsRouter = (): Router => {
  const commentsRouter = Router();

  commentsRouter.get("/product/:id", CommentsController.getCommentsByProductId);
  commentsRouter.post("/", authenticateJWT, CommentsController.createComment);
  commentsRouter.delete("/:id", [checkRole(Roles.Admin), authenticateJWT], CommentsController.removeCommentById);

  return commentsRouter;
};
