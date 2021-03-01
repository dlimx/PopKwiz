import express from 'express';
import { getUsers, getUserById, addUser, updateUserImage } from './controller';
import { authMiddleware } from './middleware';
import { StatusCode } from '../utils/http';
import { sendError } from '../utils/error';
import { uploadMiddleware } from '../client/upload';

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

// POST new picture for user
userRouter.post('/picture', authMiddleware, uploadMiddleware.single('image'), async (req, res) => {
  // try {
  //   const updatedUser = await updateUserPicture(req);
  //   res.status(200).send(updatedUser);
  // } catch (error) {
  //   console.log('error on userRouter!!!!!!!!!!!!!');
  // }

  try {
    const data = await updateUserImage(req.body, req.file, req.user);
    res.status(StatusCode.Success).send(data);
  } catch (error) {
    sendError(res, error);
  }
});
