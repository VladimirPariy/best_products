import { HttpException } from "../common/errors/exceptions";
import { CommentsModel } from "./comments.model";

class CommentsService {
  async getCommentsByProductId(id: number) {
    return CommentsModel.query()
      .where({ product: id })
      .modify("selectShotComment")
      .withGraphFetched("users(selectShotUserInfo)");
  }

  async createComment(productId: number, userId: number, message: string) {
    const insertingComment = await CommentsModel.query().insert({
      user: userId,
      product: productId,
      comment_msg: message,
    });
    if (!insertingComment) {
      return HttpException.internalServErr(
        "Unsuccessful inserting comment into table"
      );
    }
    return CommentsModel.query()
      .findById(insertingComment.$id())
      .modify("selectShotComment")
      .withGraphFetched("users(selectShotUserInfo)");
  }

  async removeCommentById(id: number) {
    const removedComment = await CommentsModel.query().deleteById(id);
    if (!removedComment) {
      return HttpException.notFound("Comment not found");
    }
    return { id };
  }
}

export default new CommentsService();
