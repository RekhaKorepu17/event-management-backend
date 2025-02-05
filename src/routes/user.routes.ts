import express from "express";
const userRoutes = express.Router();
import { registerUser } from "../controllers/users/register";
import { validateUser } from "../controllers/users/user";

userRoutes.post("/users",registerUser)

userRoutes.post("/user", validateUser)




export default userRoutes;
