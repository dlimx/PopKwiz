import express from 'express';
import { userRouter } from './users/routes';

export const apiRouter = express.Router();

apiRouter.use('/users', userRouter);

