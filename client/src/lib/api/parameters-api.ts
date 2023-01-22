import { authAxios, defaultAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import { IParameters } from "lib/interfaces/parameters/parameters.interface";

export const getProductsParametersById = async (subcategoryId: number) => {
  const { data } = await defaultAxios.get<IParameters[]>(
    `${apiUrls.parameters}${subcategoryId}`
  );
  return data;
};

export const getParameters = async () => {
  const { data } = await authAxios.get<IParameters[]>(apiUrls.parameters);
  return data;
};
