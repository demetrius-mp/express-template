import * as controller from '$controllers/auth.controller';
import authMiddleware from '$middlewares/auth.middleware';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', controller.handleSignUp);
authRouter.post('/sign-in', controller.handleSignIn);
authRouter.get('/me', authMiddleware, controller.handleMe);

export default authRouter;
