import { authAxios, defaultAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import {
  IDataForAddComment,
  IShotCommentsWithUser,
} from "lib/interfaces/comments/comments.interface";

class CommentsApi {
  async getCommentsByProductId(id: number) {
    const { data } = await defaultAxios.get<IShotCommentsWithUser[]>(
      `${apiUrls.commentsByProductId}${id}`
    );
    return data;
  }

  async addComment(body: IDataForAddComment) {
    const { data } = await authAxios.post<IShotCommentsWithUser>(
      `${apiUrls.addComment}`,
      { ...body }
    );
    return data;
  }

  async removeComment(id: number) {
    const { data } = await authAxios.delete<{ id: number }>(
      `${apiUrls.commentById}${id}`
    );
    return data;
  }
}

export default new CommentsApi();
