import { authAxios } from "lib/api/axios-instances";
import { ApiUrls } from "lib/enums/api-urls";
import { IUser } from "lib/interfaces/user-interfaces/user";
import { IUserUpdateData } from "lib/interfaces/user-interfaces/user-update-data.interface";

class UserApi {
  async getUserInfo(id: number) {
    const data = await authAxios.get<IUser>(`${ApiUrls.oneUserById}${id}`);
    return data.data;
  }

  async updateUserInfo(userInfo: IUserUpdateData) {
    const { id, user_photo, ...updatingData } = userInfo;
    let formData = new FormData();
    if (user_photo) {
      formData.append("img", user_photo);
    }
    for (const formItem in updatingData) {
      // @ts-ignore
      formData.append(formItem, updatingData[formItem]);
    }

    return await authAxios.patch<string>(
      `${ApiUrls.oneUserById}${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async getNewToken(id: number) {
    const data = await authAxios.get<IUser>(`${ApiUrls.newTokenForUser}${id}`);
    return data.data;
  }
}

export default new UserApi();
