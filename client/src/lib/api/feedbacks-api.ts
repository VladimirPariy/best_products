import { authAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";

class FeedbacksApi {
  async getUserFeedbacks(userId: number) {
    const { data } = await authAxios.get(`${apiUrls.feedbacks}${userId}`);
    return data;
  }
}

export default new FeedbacksApi();
