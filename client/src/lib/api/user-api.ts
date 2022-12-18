import axios from "axios";
import {ApiUrls} from "lib/enums/api-urls";
import {IReturningUserData} from "lib/interfaces/returning-user-data";
import {IUserUpdateData} from "lib/interfaces/user-update-data.interface";


class UserApi {
  async updateUserInfo(userInfo: IUserUpdateData,) {
    const {id, token, user_photo, ...updatingData} = userInfo
    let formData = new FormData();
    if (user_photo) {
      formData.append("img", user_photo);
    }
    for (const formItem in updatingData) {
      // @ts-ignore
      formData.append(formItem, updatingData[formItem])
    }

    return await axios.patch<string>(
      `${ApiUrls.oneUserById}${id}`,
      formData,
      {
        baseURL: ApiUrls.BASE_URL,
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      }
    );
  }

  async getUserInfo({id, token}: { id: number, token: string }) {
    const data = await axios.get<IReturningUserData>(
      `${ApiUrls.oneUserById}${id}`,
      {
        baseURL: ApiUrls.BASE_URL,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    return data.data
  }
}

export default new UserApi();