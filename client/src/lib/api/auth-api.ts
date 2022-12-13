import axios from "axios";
import {ApiUrls} from "lib/enums/api-urls";

class AuthApi {
  async registration(firstName: string, lastName: string, email: string, password: string, isGetUpdate: boolean) {
    return await axios.post(ApiUrls.registration, {
        firstName,
        lastName,
        email,
        password,
        isGetUpdate,
      },
      {
        baseURL: ApiUrls.BASE_URL
      });
  }
}

export default new AuthApi();