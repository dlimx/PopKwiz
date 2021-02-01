import express from 'express';
import { categories } from './categories';

export const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
  res.status(200).send({ data: categories });
});
