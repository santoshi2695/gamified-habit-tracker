import express from 'express';
import userRouter from './user.routes';
import habitRouter from './habit.routes';

const router = express.Router();

router.use('/user', userRouter);
router.use('/habit', habitRouter);

export default router;
