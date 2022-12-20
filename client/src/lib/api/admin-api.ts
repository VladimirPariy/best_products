import {defaultAxios} from "lib/api/axios-instances";
import {ApiUrls} from "lib/enums/api-urls";

export const createNewProduct = async (formData: FormData) => {
  const data = await defaultAxios.post(ApiUrls.createProduct, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}