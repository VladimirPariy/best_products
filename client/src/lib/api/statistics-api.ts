import { authAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import {
  IStatisticsCommented,
  IStatisticsFavorites,
  IStatisticsPopular,
  IStatisticsRating,
  IStatisticsUsers,
} from "lib/interfaces/statistics.interface";

class StatisticsApi {
  async getNewUsers() {
    const { data } = await authAxios.get<IStatisticsUsers[]>(
      apiUrls.userStatistic
    );
    return data;
  }

  async getMostCommented() {
    const { data } = await authAxios.get<IStatisticsCommented[]>(
      apiUrls.commentedStatistic
    );
    return data;
  }

  async getMostPopular() {
    const { data } = await authAxios.get<IStatisticsPopular[]>(
      apiUrls.popularStatistic
    );
    return data;
  }

  async getMostRating() {
    const { data } = await authAxios.get<IStatisticsRating[]>(
      apiUrls.ratingStatistic
    );
    return data;
  }

  async getMostFavorites() {
    const { data } = await authAxios.get<IStatisticsFavorites[]>(
      apiUrls.favoritesStatistic
    );
    return data;
  }
}

export default new StatisticsApi();
