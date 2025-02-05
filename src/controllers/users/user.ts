import {Request, Response} from "express"
import User from "../../models/user";
import bcrypt from "bcrypt"
export const validateUser= async(req: Request, res: Response):Promise<any> => {
    try {
        const { email, password } = req.body;
        const user:any = await User.findOne({ where: { email: email } });
        if (!user) {
          return res.status(404).json({ message:"email not found"});
        }
        const isValid= await bcrypt.compare(password, user.password);
        if (!isValid) {
          return res.status(401).json({ message: "Invalid password" });
        }
        return res.status(200).json({ message: "Valid credentials", user: user});
      } catch (error: any) {
        return { message: "Failed to fetch credentials", error: error.message };
      }
}