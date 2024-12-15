import User from "../../models/user";
import { User as UserType } from "../../types/User";
import { User as UserClass } from "../../services/User";
import { Request, Response } from "express";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { username, password, email, mobile, role } = req.body;
    const newUser: UserType = new UserClass(
      username,
      password,
      email,
      mobile,
      role
    );
    const existingUser: any = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already registered" });
    }
    await User.create(newUser);
    return res.status(201).send({ message: "User account created" });
  } catch (error: any) {
    console.error("Error during user registration:", error);
    return { message: "Failed to create a user", error: error.message };
  }
};
