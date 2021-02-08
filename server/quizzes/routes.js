import express from 'express';
import { getQuiz, getQuizzes, createQuiz, rateQuiz } from './controller';
import { authMiddleWare } from '../utils/authMiddleWare';
import { sendError } from '../utils/error';
import { StatusCode } from '../utils/http';

export const quizRouter = express.Router();

// GET quiz
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

// JLIN88 Pending Route
// quizRouter.get('/quizzes/:id', async (req, res) => {
//   const id = req.params.id;
//   console.log(`id = ${id}`)
//   let doc = db.collection('quizzes').doc(id)
//   let quiz = doc.get()
//   .then(quiz => {
//     if (!quiz.exists) throw new Error('Quiz not found');
//     res.status(200).json({data: quiz.data})})
//   .catch(error => res.status(500).send(error));
// });

// Send Score - will change to POST method.
quizRouter.get('/:user/:id/:score', async (req, res) => {
  // const data = await rateQuiz(req.params);
  try {
    const data = await rateQuiz(req.params);
    res.status(StatusCode.Success).send(data);
  } catch (error) {
    sendError(res, error);
  }
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
