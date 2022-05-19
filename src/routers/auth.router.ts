import { Router } from "express";

import { authController } from "$src/controllers";

const authRouter = Router();

authRouter.post("/sign-up", authController.handleSignUp);
authRouter.post("/sign-in", authController.handleSignIn);
authRouter.post("/new-token", authController.handleNewToken);
authRouter.get("/me", authController.handleMe);

export default authRouter;
