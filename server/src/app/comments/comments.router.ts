import { Router } from "express";
import { authenticateJWT } from "../common/middlewares/auth-middleware";
import { checkRole } from "../common/middlewares/role-middleware";
import CommentsController from "./comments.controller";
import { Roles } from "../common/enums/Roles";
import { tryCatch } from "../common/utils/try-catch";

export const createCommentsRouter = (): Router => {
  const commentsRouter = Router();
  const instanceCommentsController = CommentsController.getInstance();

  commentsRouter.get("/product/:id", tryCatch(instanceCommentsController.getCommentsByProductId));
  commentsRouter.post("/", authenticateJWT, tryCatch(instanceCommentsController.createComment));
  commentsRouter.delete(
    "/:id",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceCommentsController.removeCommentById)
  );

  return commentsRouter;
};
