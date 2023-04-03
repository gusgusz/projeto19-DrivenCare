import { Router } from "express";
import {signUp, signIn}  from "../controllers/userControllers.js"

const userRoutes = Router();

userRoutes.post("/sign-up", signUp());
userRoutes.post("/sign-in", signIn());

export default userRoutes;