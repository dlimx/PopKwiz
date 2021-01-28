import express from 'express';
import { userRouter } from './users/routes';
import { signupRouter } from './users/signupRoute';
import { authMiddleWare } from './utils/authMiddleWare';

export const apiRouter = express.Router();

apiRouter.use('/signup', signupRouter);
apiRouter.use('/users', authMiddleWare);
apiRouter.use('/users', userRouter);
