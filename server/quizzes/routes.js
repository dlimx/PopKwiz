import express from 'express';
import { getQuiz, getQuizzes, createQuiz, submitQuiz } from './controller';
import { authMiddleWare } from '../utils/authMiddleWare';
import { sendError } from '../utils/error';
import { StatusCode } from '../utils/http';

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
    res.status(StatusCode.Success).send(data);
  } catch (error) {
    sendError(res, error);
  }
});

// GET specific quiz
quizRouter.get('/:id', async (req, res) => {
  await getQuiz(req.params.id)
    .then((quiz) => {
      res.status(200).json({ data: quiz.data() });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'something went wrong retreving quizzes from db.' });
    });
});

quizRouter.post('/:id/results', async (req, res) => {
  try {
    const data = await submitQuiz(req.body);
  } catch (error) {
    sendError(res, error);
  }
});
