import express from 'express';
import { userRouter } from './users/routes';
import { quizRouter } from './quizzes/routes';
import { categoryRouter } from './categories/routes';

export const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/quizzes', quizRouter);
apiRouter.use('/categories', categoryRouter);
