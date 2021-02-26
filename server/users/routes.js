import express from 'express';
import UUID from 'uuid-v4'; // import fs from 'fs';
// import multer from 'multer';
// import path from 'path';
// import url from 'url';
// import { promisify } from 'util';
// import * as stream from 'stream';
import { getUsers, getUserById, addUser, updateUserPicture } from './controller';
import { authMiddleware, uploadIMG } from './middleware';
import { StatusCode } from '../utils/http';
import { sendError } from '../utils/error';
import { bucket } from '../database/firestore';

// const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
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
userRouter.post('/picture/:id', uploadIMG.single('file'), async (req, res) => {
  const uuid = UUID();
  const { file } = req;
  const { uid } = req.body;
  let fname = file.originalname;

  if (file.mimetype === 'image/png') {
    console.log('file type is png');
    fname = `${uuid}.png`;
  } else if (file.mimetype === 'image/jpeg') {
    console.log('file type is jpeg');

    fname = `${uuid}.jpg`;
  }

  if (!req.file) {
    res.status(400).send('Error: No files found');
  } else {
    const blob = bucket.file(fname);
    const blobWriter = blob.createWriteStream({
      metadata: {
        destination: 'images',
        contentType: req.file.mimetype,
        firebaseStorageDownloadtokens: uuid,
      },
    });

    blobWriter.on('error', (err) => {
      console.log(err);
    });

    blobWriter.on('finish', () => {
      res.status(200).send(fname);
    });

    blobWriter.end(req.file.buffer);
    updateUserPicture(uid, fname);
  }
});
