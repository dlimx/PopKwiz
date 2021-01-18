import express from 'express';
import { getUsers, addUser } from './controller';

export const userRouter = express.Router();

userRouter.get('/', async(req, res) => {
  await getUsers();
  res.status(200).send('get users');
});

userRouter.post('/add', async(req, res) => {
  await addUser(req, res);
  // res.status(200).send('add users');
  // commented this out. Browser complains that we can't set headers twice.
});
