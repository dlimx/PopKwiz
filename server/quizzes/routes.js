import express from 'express';
import { getQuiz, getQuizzes, createQuiz, submitQuiz, rateQuiz, getQuizResult } from './controller';
import { authMiddleware } from '../users/middleware';
import { sendError } from '../utils/error';
import { StatusCode } from '../utils/http';
import { getDataQuiz } from './model';
import { uploadMiddleware } from '../client/upload';

export const quizRouter = express.Router();

// GET quiz
quizRouter.get('/:id', async (req, res) => {
  await getQuiz(req.params.id)
    .then((quiz) => {
      res.status(200).json({ data: getDataQuiz(quiz) });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong retreving quizzes from db.' });
    });
});

// GET answers for a quiz
quizRouter.get('/:id/answers', async (req, res) => {
  await getQuiz(req.params.id)
    .then((quiz) => {
      console.log(quiz);
      res.status(200).json({ data: quiz });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong retreving quizzes from db.' });
    });
});

// POST Rating and Comment
quizRouter.post('/rating', authMiddleware, async (req, res) => {
  try {
    const data = await rateQuiz(req.body, req.user);
    res.status(StatusCode.Success).send(data);
  } catch (error) {
    sendError(res, error);
  }
});

// GET List of Quizzes
quizRouter.get('/', async (req, res) => {
  await getQuizzes(req.query)
    .then((quizList) => {
      res.status(200).send(quizList.map((quiz) => getDataQuiz(quiz)));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong retreving quizzes from db.' });
    });
});

// POST Create Quiz
quizRouter.post('/', authMiddleware, uploadMiddleware.single('image'), async (req, res) => {
  try {
    const data = await createQuiz(req.body, req.file, req.user);
    res.status(StatusCode.Success).send(data);
  } catch (error) {
    sendError(res, error);
  }
});

// POST quiz results
quizRouter.post('/:id/results', async (req, res) => {
  try {
    const data = await submitQuiz(req.body, req.user);
    res.status(StatusCode.Success).send(data);
  } catch (error) {
    sendError(res, error);
  }
});

// GET specific quiz results
quizRouter.get('/:id/results/:resultID', async (req, res) => {
  await getQuizResult(req.params.resultID)
    .then((results) => {
      res.status(200).json({ results });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong retreving results from db.' });
    });
});
