import express from 'express';
import { getQuizzes, createQuiz, rateQuiz } from './controller';
import { authMiddleWare } from '../utils/authMiddleWare';
import { sendError } from '../utils/error';
import { StatusCode } from '../utils/http';

export const quizRouter = express.Router();

quizRouter.get('/:user/:id/:score', async (req, res) => {

  const data = await rateQuiz(req.params);
  // try {
  //   const data = await rateQuiz(req.params);
  //   res.status(StatusCode.Success).send(data);
  // } catch (error) {
  //   sendError(res, error);
  // }
});
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
