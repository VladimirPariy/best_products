import axios from "axios";

import { defaultAxios } from "lib/api/axios-instances";
import { ApiUrls } from "lib/enums/api-urls";
import { IUser } from "lib/interfaces/user-interfaces/user";
import { IUserUpdateData } from "lib/interfaces/user-update-data.interface";

class UserApi {
  async getUserInfo({ id, token }: { id: number; token: string }) {
    const data = await defaultAxios.get<IUser>(`${ApiUrls.oneUserById}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  }

  async updateUserInfo(userInfo: IUserUpdateData) {
    const { id, token, user_photo, ...updatingData } = userInfo;
    let formData = new FormData();
    if (user_photo) {
      formData.append("img", user_photo);
    }
    for (const formItem in updatingData) {
      // @ts-ignore
      formData.append(formItem, updatingData[formItem]);
    }

    return await defaultAxios.patch<string>(
      `${ApiUrls.oneUserById}${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async getNewToken({ id, token }: { id: number; token: string }) {
    const data = await defaultAxios.get<IUser>(
      `${ApiUrls.newTokenForUser}${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  }
}

export default new UserApi();
