import express from 'express';
import { getUsers, addUser } from './controller';

export const userRouter = express.Router();

// GET users
userRouter.get('/', async (req, res) => {
  const user = req.query;
  await getUsers(user)
    .then((userList) => {
      res.status(200).send(userList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'something went wrong retreving users from db.' });
    });
});

// POST new user to database
userRouter.post('/add', async (req, res) => {
  const user = req.body;
  await addUser(user)
    .then(() => {
      res.status(200).send('add users');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'something went wrong adding user to db.' });
    });
});
