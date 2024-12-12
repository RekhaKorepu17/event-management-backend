import User from "../models/user";
import { IUser } from "../types/IUser";
export class UserAuthentication {
  username: string;
  password: string;
  email: string;
  mobile: number;

  constructor(
   user: IUser
  ) {
    (this.username = user.username),
      (this.password = user.password),
      (this.email = user.email),
      (this.mobile = user.mobile);
  }

  register = async () => {
    try {
      const user = await User.create({
        username: this.username,
        password: this.password,
        email: this.email,
        mobile: this.mobile,
      });
      return { message: "User account created" };
    } catch (error: any) {
      return { message: "Failed to create a user", error: error.message };
    }
  };

  static getCredendentials = async (username: string, password: string) => {
    try {
      const user:any = await User.findOne({ where: { username: username } });
      if (!user) {
        return { message: "User not found" };
      }
      if (user.password !== password) {
        return { message: "Invalid password" };
      }
      return { message: "valid Credentials", user: user };
    } catch (error: any) {
      return { message: "Failed to fetch credentials", error: error.message };
    }
  };
}
