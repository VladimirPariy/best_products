import axios from "axios";
import { ApiUrls } from "lib/enums/api-urls";
import { ILoginData } from "lib/interfaces/login-data";
import { IRegistrationData } from "lib/interfaces/registration-data.interface";
import { IReturningUserData } from "lib/interfaces/returning-user-data";

class AuthApi {
  async registration({
    firstName,
    lastName,
    email,
    password,
    isGetUpdate,
  }: IRegistrationData) {
    const data = await axios.post<IReturningUserData>(
      ApiUrls.registration,
      {
        firstName,
        lastName,
        email,
        password,
        isGetUpdate,
      },
      { baseURL: ApiUrls.BASE_URL }
    );
    return data.data;
  }

  async login({ login, password }: ILoginData) {
    const data = await axios.post<IReturningUserData>(
      ApiUrls.login,
      { login, password },
      { baseURL: ApiUrls.BASE_URL }
    );
    return data.data;
  }
}

export default new AuthApi();
