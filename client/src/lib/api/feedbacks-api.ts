import { authAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import {
  IDataForAddFeedback,
  IFeedback,
} from "lib/interfaces/feedbacks.interface";

class FeedbacksApi {
  async getUserFeedbacks(userId: number) {
    const { data } = await authAxios.get<IFeedback[]>(
      `${apiUrls.feedbacks}${userId}`
    );
    return data;
  }
  async addFeedback(dataForAddFeedback: IDataForAddFeedback) {
    const { data } = await authAxios.post<IFeedback>(
      apiUrls.feedbacks,
      dataForAddFeedback
    );
    return data;
  }
}

export default new FeedbacksApi();
