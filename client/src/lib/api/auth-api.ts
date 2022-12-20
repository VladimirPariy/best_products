import axios from "axios";

import {defaultAxios} from "lib/api/axios-instances";
import {ApiUrls} from "lib/enums/api-urls";
import {ILoginData} from "lib/interfaces/user-interfaces/login-data";
import {IRegistrationData} from "lib/interfaces/user-interfaces/registration-data";
import {IToken} from "lib/interfaces/user-interfaces/token";

class AuthApi {
  async registration({
                       firstName,
                       lastName,
                       email,
                       password,
                       isGetUpdate,
                     }: IRegistrationData) {
    const data = await defaultAxios.post<IToken>(ApiUrls.registration, {
      firstName,
      lastName,
      email,
      password,
      isGetUpdate,
    });
    return data.data;
  }

  async login({login, password}: ILoginData) {
    const data = await defaultAxios.post<IToken>(ApiUrls.login, {
      login,
      password,
    });
    return data.data;
  }

}

export default new AuthApi();
