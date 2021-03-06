import express from 'express';
import { getQuiz, getQuizzes, createQuiz, submitQuiz, rateQuiz, delComment } from './controller';
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

// POST Rating and Comment
quizRouter.post('/rating', authMiddleware, async (req, res) => {
  try {
    const data = await rateQuiz(req.body, req.user);
    res.status(StatusCode.Success).send(data);
  } catch (error) {
    sendError(res, error);
  }
});

// Delete Rating and Comment
quizRouter.delete('/rating', authMiddleware, async (req, res) => {
  try {
    // console.log(req.query.quiz);
    // console.log(req.user.id);
    const data = await delComment(req.query, req.user);
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
quizRouter.post('/picture', authMiddleware, uploadMiddleware.single('image'), async (req, res) => {
  try {
    const data = await createQuiz(req.body, req.file, req.user);
    res.status(StatusCode.Success).send(data);
  } catch (error) {
    sendError(res, error);
  }
});

// // GET specific quiz
// quizRouter.get('/:id', async (req, res) => {
//   await getQuiz(req.params.id)
//     .then((quiz) => {
//       res.status(200).json({ data: quiz.data() });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: 'something went wrong retreving quizzes from db.' });
//     });
// });

quizRouter.post('/:id/results', async (req, res) => {
  try {
    const data = await submitQuiz(req.body, req.user);
    res.status(StatusCode.Success).send(data);
  } catch (error) {
    sendError(res, error);
  }
});
