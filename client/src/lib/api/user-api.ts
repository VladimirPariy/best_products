import { authAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import {IUpdateUserData} from "lib/interfaces/user/update-user-data.interface";
import { IRole, IUser } from "lib/interfaces/user/user.interface";

class UserApi {
  async getAllUsers() {
    const { data } = await authAxios.get<IUser[]>(apiUrls.all_users);
    return data;
  }

  async getAllRoles() {
    const { data } = await authAxios.get<IRole[]>(apiUrls.all_roles);
    return data;
  }

  async changeUserRole(user_id: number, role: number) {
    const { data } = await authAxios.patch<{ updatedUser: number }>(
      `${apiUrls.role_by_user_id}${user_id}`,
      {
        role,
      }
    );
    return data;
  }

  async removeOneUser(id: string) {
    const { data } = await authAxios.delete<string>(
      `${apiUrls.one_user_by_id}${id}`
    );
    return data;
  }

  async getUserInfo(id: number) {
    const { data } = await authAxios.get<IUser>(
      `${apiUrls.one_user_by_id}${id}`
    );
    return data;
  }

  async updateUserInfo({ formData, id }: IUpdateUserData) {
    const data = await authAxios.patch<string>(
      `${apiUrls.one_user_by_id}${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }

  async getNewToken(id: number) {
    const { data } = await authAxios.get<IUser>(
      `${apiUrls.newTokenForUser}${id}`
    ); //when changed user info
    return data;
  }
}

export default new UserApi();
