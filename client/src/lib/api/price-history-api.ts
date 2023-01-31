import { authAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import { IShotPriceHistory } from "lib/interfaces/price-history.interface";

export const priceHistoryApi = async (id: number) => {
  const { data } = await authAxios.get<IShotPriceHistory[]>(
    `${apiUrls.priceHistoryByProductId}${id}`
  );
  return data;
};
