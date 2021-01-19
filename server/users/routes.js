import express from 'express';
import { getUsers, addUser } from './controller';

export const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const user = req.query;
  const userList = await getUsers(user);
  res.status(200).send(userList);
});

userRouter.post('/add', async (req, res) => {
  const user = req.body;
  await addUser(user);
  res.status(200).send('add users');
});
