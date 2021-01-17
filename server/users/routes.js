import express from 'express';
import { getUsers, addUser } from './controller';

export const userRouter = express.Router();

userRouter.get('/', async(req, res) => {
  await getUsers();
  res.status(200).send('get users');
});

userRouter.get('/add', async(req, res) => {
  await addUser();
  res.status(200).send('add users');
});
