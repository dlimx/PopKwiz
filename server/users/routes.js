import express from 'express';
import { getUsers, getUserById, addUser, updateUserPicture } from './controller';
import { authMiddleware } from './middleware';
import { StatusCode } from '../utils/http';
import { sendError } from '../utils/error';

export const userRouter = express.Router();

// GET users
userRouter.get('/', authMiddleware, async (req, res) => {
  const user = req.query;

  try {
    const userList = await getUsers(user);
    res.status(StatusCode.Success).send(user);
  } catch (error) {
    console.log(error);
    sendError(res, error);
  }
});

// GET users
userRouter.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.status(StatusCode.Success).send(user);
  } catch (error) {
    console.log(error);
    sendError(res, error);
  }
});

// POST new user to database
userRouter.post('/', async (req, res) => {
  const user = req.body;
  try {
    await addUser(user);
    res.status(StatusCode.Success).send('added user');
  } catch (error) {
    console.log(error);
    sendError(res, error);
  }
});

// POST new user to database
userRouter.post('/picture/:id', async (req, res) => {
  const user = req.body;
  try {
    await updateUserPicture(user);
    res.status(StatusCode.Success).send('updated user picture');
  } catch (error) {
    console.log(error);
    sendError(res, error);
  }
});
