import * as controller from '$controllers/auth.controller';
import authMiddleware from '$middlewares/auth.middleware';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', controller.signUp);
authRouter.post('/sign-in', controller.signIn);
authRouter.get('/me', authMiddleware, controller.me);

export default authRouter;
