import axios from "axios";
import {ApiUrls} from "lib/enums/api-urls";
import {IReturningUserData} from "lib/interfaces/returning-user-data";
import {IUserUpdateData} from "lib/interfaces/user-update-data.interface";

class UserUpdateApi {
  async updateUserInfo(userInfo: IUserUpdateData,) {
    const {id, token, ...updatingData} = userInfo
    const data = await axios.patch<IReturningUserData>(
      `${ApiUrls.userUpdate}${id}`,
      {...updatingData},
      {baseURL: ApiUrls.BASE_URL, headers: {'Authorization': `Bearer ${token}`}}
    );
    return data.data;
  }

}

export default new UserUpdateApi();