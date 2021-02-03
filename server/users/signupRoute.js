import express from 'express';
import { addUser } from './controller';

export const signupRouter = express.Router();

// POST new user to database
signupRouter.post('/', async (req, res) => {
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
