import { createUser, login, getUserProfile } from "../../controllers/user_controller.js";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.js";

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", login);
userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;
