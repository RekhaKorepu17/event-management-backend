import User from "../../models/user";
import { User as UserType } from "../../types/User";
import { User as UserClass } from "../../services/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt"

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password, email, mobile, role } = req.body;
    if (!username || !password || !email || !mobile || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);
    
    console.log("Encrypted password generated:", encryptedPassword);
    
    const newUser: UserType = new UserClass(username, encryptedPassword, email, mobile, role);

    const existingUser: any = await User.findOne({ where: { email } });
    console.log("User.findOne called:", existingUser);
    
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    
    const user = await User.create(newUser);
    
    return res.status(201).json({ message: "User account created", user });
  } catch (error: any) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ message: "Failed to create a user", error: error.message });
  }
};


