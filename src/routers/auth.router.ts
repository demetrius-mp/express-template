import { authController } from '$src/controllers';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', authController.handleSignUp);
authRouter.post('/sign-in', authController.handleSignIn);
authRouter.get('/me', authController.handleMe);

export default authRouter;
