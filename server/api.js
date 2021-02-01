import express from 'express';
import { userRouter } from './users/routes';
import { quizRouter } from './quizzes/routes';

export const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/quizzes', quizRouter);
