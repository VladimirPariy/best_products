import { RolesModel } from "./models/roles.model";
import { IUserUpdatingFields } from "./user.interfaces";
import { UsersModel } from "./models/users.model";
import { IDataForCreatingUser } from "../auth/auth.interface";

export default class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async createUser(data: IDataForCreatingUser) {
    const { firstName, lastName, email, encryptedPass, isGetUpdate } = data;
    return UsersModel.query().insert({
      email,
      password: encryptedPass,
      first_name: firstName,
      last_name: lastName,
      is_get_update: isGetUpdate,
    });
  }

  async getAllUsers() {
    return UsersModel.query().withGraphFetched("users_roles");
  }

  async getRoles() {
    return RolesModel.query();
  }

  async getUserById(id: number) {
    return UsersModel.query().findById(id).withGraphFetched("users_roles");
  }

  async getUserByLogin(login: string) {
    const user = await UsersModel.query()
      .skipUndefined()
      .where({ email: login })
      .orWhere({ phone_number: login });
    return user[0];
  }

  async findUserByEmailOrPhoneNumber(email?: string, phone_number?: string) {
    return UsersModel.query().skipUndefined().where({ email }).orWhere({ phone_number });
  }

  async updateUserById(id: number, payload: Partial<IUserUpdatingFields>) {
    return UsersModel.query().patch(payload).where({ user_id: id });
  }

  async updateUserRoleById(user_id: number, role: number) {
    return UsersModel.query().findById(user_id).update({ role });
  }

  async removeOneById(id: number) {
    return UsersModel.query().deleteById(id);
  }
}
