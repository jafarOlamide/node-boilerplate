import { Router } from "express";
import { AdminLogin, Login, MentorLogin } from "../controllers/Auth/auth.controller.js";
import { createAdmin, createUser } from "../controllers/admin.controller.js";

const authRouter = Router();

authRouter.route('/').post(createAdmin);
authRouter.route('/login').post(Login);


export default authRouter;