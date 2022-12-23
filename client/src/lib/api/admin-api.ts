import {authAxios} from "lib/api/axios-instances";
import {ApiUrls} from "lib/enums/api-urls";
import {IRole, IUser} from "lib/interfaces/user-interfaces/user";

class AdminApi {
  async createNewProduct(formData: FormData) {
    const {data} = await authAxios.post(ApiUrls.createProduct, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }

  async getAllUsers() {
    const {data} = await authAxios.get<IUser[]>(ApiUrls.allUsers    );
    return data;
  }

  async getAllRoles() {
    const {data} = await authAxios.get<IRole[]>(ApiUrls.allRoles);
    return data;
  }

  async changeUserRole(user_id: number, role: number) {
    const {data} = await authAxios.patch(`${ApiUrls.updateRole}${user_id}`, {
      role,
    });
    return data;
  }

  async removeOneUser(id: string) {
    const {data} = await authAxios.delete(`${ApiUrls.oneUserById}${id}`);
    return data;
  }
}

export default new AdminApi();
