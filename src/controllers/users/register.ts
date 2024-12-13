import User from "../../models/user";
import { User as UserType } from "../../types/User";
import { User as UserClass } from "../../services/User";
import {Request, Response} from "express"

 export const registerUser = async (req: Request, res: Response ) :Promise<any>=> {
    try {
      const {username, password, email, mobile, isAdmin}= req.body;
      const newUser: UserType = new UserClass(username, password, email, mobile, isAdmin)
      const existingUser:any = await User.findOne({ where: { username: username } });
      if(existingUser){
        return res.status(400).json({ message:"Username already exists"});
      }
      await User.create(newUser);
      return res.status(400).json({ message:"User account created"});
    } catch (error: any) {
      return { message: "Failed to create a user", error: error.message };
    }
  };


