import * as controller from '$controllers/auth.controller';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', controller.handleSignUp);
authRouter.post('/sign-in', controller.handleSignIn);
authRouter.get('/me', controller.handleMe);

export default authRouter;
