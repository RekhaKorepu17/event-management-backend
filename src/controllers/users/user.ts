import {Request, Response} from "express"
import User from "../../models/user";
export const validateUser= async(req: Request, res: Response):Promise<any> => {
    try {
        const { username, password } = req.query;
        const user:any = await User.findOne({ where: { username: username } });
        if (!user) {
          return res.status(404).json({ message:"User not found"});
        }
        if (user.password !== password) {
          return res.status(404).json({ message: "Invalid password" });
        }
        return res.status(201).json({ message: "Valid credentials" });
      } catch (error: any) {
        return { message: "Failed to fetch credentials", error: error.message };
      }
}