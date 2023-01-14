import { defaultAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import { ILoginData } from "lib/interfaces/user/login-data";
import { IRegistrationData } from "lib/interfaces/user/registration-data";
import { IToken } from "lib/interfaces/user/token";

class AuthApi {
  async registration(regData: IRegistrationData) {
    const { data } = await defaultAxios.post<IToken>(apiUrls.sign_up, regData);
    return data;
  }

  async login(loginData: ILoginData) {
    const { data } = await defaultAxios.post<IToken>(
      apiUrls.sign_in,
      loginData
    );
    return data;
  }
}

export default new AuthApi();
