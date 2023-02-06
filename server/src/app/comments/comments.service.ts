import { CommentsModel } from "./comments.model";
import { ICreateCommentData } from "./comment.interface";

export default class CommentsService {
  private static instance: CommentsService;

  private constructor() {}

  public static getInstance(): CommentsService {
    if (!CommentsService.instance) {
      CommentsService.instance = new CommentsService();
    }
    return CommentsService.instance;
  }

  async getCommentsByProductId(id: number) {
    return CommentsModel.query()
      .where({ product: id })
      .modify("selectShotComment")
      .withGraphFetched("users(selectShotUserInfo)");
  }

  async createComment(payload: ICreateCommentData) {
    const { productId, userId, message } = payload;
    return CommentsModel.query().insert({
      user: userId,
      product: productId,
      comment_msg: message,
    });
  }

  async getCommentByID(id: number) {
    return CommentsModel.query().findById(id).modify("selectShotComment").withGraphFetched("users(selectShotUserInfo)");
  }

  async removeCommentById(id: number) {
    return CommentsModel.query().deleteById(id);
  }
}
