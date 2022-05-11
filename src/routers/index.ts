import authRouter from '$routers/auth.router';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);

export default router;
