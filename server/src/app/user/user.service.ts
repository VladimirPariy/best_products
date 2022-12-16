import bcrypt from "bcryptjs";
import {Request} from "express";
import fileUpload from "express-fileupload";
import path from "path";
import {v4 as uuidv4} from "uuid";

import {generateJwtToken} from "@/app/auth/auth.service";
import {HttpException} from "@/app/common/errors/exceptions";
import {IUserUpdatingFields} from "@/app/lib/interfaces/user-updating-fields.interface";
import {Users} from "@/database/models/users/users";

class UserService {
  async getUserByEmailOrPhoneNumber(login: string) {
    return Users.query()
    .skipUndefined()
    .where({email: login})
    .orWhere({phone_number: login});
  }

  async getUserById(id: string) {
    return Users.query()
    .select([
      'user_id',
      'first_name',
      'last_name',
      'email',
      'password',
      'phone_number',
      'user_photo',
      'is_get_update',
      'created_at',
      'updated_at',
      'role',
      'roles.role_title as role_name'
    ])
    .join("roles", "users.role", "roles.role_id")
    .where('user_id', '=', id)
  }

  async selectUserByIdAndCreateToken(id: string) {
    const user = (await this.getUserById(`${id}`))[0]

    const token = generateJwtToken(user.user_id, user.email, user.role);
    if (!token) return HttpException.internalServErr(`Unsuccessful attempt to create token`);

    return {user, token}
  }


  async updateUserById(id: string, {body}: Request, img?: fileUpload.UploadedFile) {

    // Валидация полей. Любые не предусмотренные - будут отброшены.
    const fields = ['first_name', 'last_name', 'email', 'password', 'phone_number', 'is_get_update']
    let infoFields = {} as IUserUpdatingFields;
    for (const field in body) {
      if (fields.includes(field)) {
        infoFields = {...infoFields, [field]: body[field]}
      }
    }
///////////////////////////////////////////////////////////////////////////////////////////
    let fileName: string | undefined;
    if (img) {
      fileName = `${uuidv4()}.jpg`
      await img.mv(path.resolve(__dirname, "..", "static", fileName))
      infoFields = {...infoFields, user_photo: fileName}
    }


    if (infoFields.password) {
      infoFields.password = await bcrypt.hash(infoFields.password, 7);
    }

    const updateInfo = await Users.query().patch(infoFields).where({user_id: +id});
    if (!updateInfo) {
      return HttpException.internalServErr(`Unsuccessful updating user`);
    }

    return await this.selectUserByIdAndCreateToken(id)

  }
}

export default new UserService();