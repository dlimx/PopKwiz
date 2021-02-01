import express from 'express';
import { getQuizzes, createQuiz } from './controller';
import { authMiddleWare } from '../utils/authMiddleWare';

export const quizRouter = express.Router();

// GET quizzes
quizRouter.get('/', async (req, res) => {
  await getQuizzes(req.query)
    .then((quizList) => {
      res.status(200).send(quizList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'something went wrong retreving quizzes from db.' });
    });
});

quizRouter.post('/', authMiddleWare, async (req, res) => {
  try {
    const data = await createQuiz(req.body);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send('error');
  }
});
