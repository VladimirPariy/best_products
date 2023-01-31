import { authAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import { IDataForUpdateUserRole } from "lib/interfaces/user-role.interface";
import { IUpdateUserData } from "lib/interfaces/user/update-user-data.interface";
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

  async changeUserRole({ userId, newRole }: IDataForUpdateUserRole) {
    const { data } = await authAxios.patch<IUser>(
      `${apiUrls.role_by_user_id}${userId}`,
      {
        role: newRole,
      }
    );
    return data;
  }

  async removeOneUser(id: number) {
    const { data } = await authAxios.delete<{ userId: number }>(
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
