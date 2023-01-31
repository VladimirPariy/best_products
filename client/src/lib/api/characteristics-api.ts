import { authAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import { ICharacteristics } from "lib/interfaces/characteristic.interface";

export const getCharacteristics = async () => {
  const { data } = await authAxios.get<ICharacteristics[]>(
    apiUrls.characteristics
  );
  return data;
};
