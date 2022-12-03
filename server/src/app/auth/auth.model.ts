import { Users } from "../../database/Models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HttpException } from "../middleware/exceptions";

require("dotenv").config();

class AuthModel {
  async getCandidateDuplicate(email: string, login: string) {
    return Users.query().skipUndefined().where({ login }).orWhere({ email });
  }

  async registration(login: string, email: string, password: string) {
    const candidate = await this.getCandidateDuplicate(email, login);
    if (candidate.length) {
      return new HttpException("User already exists", 400);
    }

    const encryptedPass = await bcrypt.hash(password, 7);

    return Users.query().insert({ login, email, password: encryptedPass });
  }

  async login(login: string, email: string, password: string) {
    const candidate = await this.getCandidateDuplicate(email, login);
    if (!candidate.length) {
      return new HttpException("User is not found", 404);
    }

    const validPassword = bcrypt.compareSync(password, candidate[0].password);
    if (!validPassword) {
      return new HttpException(`User inputted invalid password`, 400);
    }

    return jwt.sign({ _id: candidate[0]._id }, process.env.SECRET || "", {
      expiresIn: 10,
    });
  }
}

export default new AuthModel();
