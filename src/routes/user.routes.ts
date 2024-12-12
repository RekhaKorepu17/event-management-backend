import express, { Response } from "express";
const userRoutes = express.Router();
import { UserAuthentication } from "../classes/UserAuthication";

userRoutes.post("/registerUser", async (req: any, res: any) => {
  try {
    const { user } = req.body;
    const newUser = new UserAuthentication(user);

    const getRegistered = await newUser.register();

    if (getRegistered.message === "User account created") {
      return res.status(200).json({ user: newUser });
    } else {
      return res.status(400).json({ message: getRegistered.message });
    }
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to create a user" });
  }
});

userRoutes.get("/getCredentials", async (req: any, res: any) => {
  try {
    const { username, password } = req.query;
    const isValidUser = await UserAuthentication.getCredendentials(
      username,
      password
    );
    if (isValidUser.message === "User not found") {
      return res.status(404).json({ message: isValidUser.message });
    } else if (isValidUser.message === "Invalid password") {
      return res.status(404).json({ message: isValidUser.message });
    }
    return res.status(201).json({ message: isValidUser.message });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to create a user" });
  }
});

export default userRoutes;
