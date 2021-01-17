import NError, { VError } from '@netflix/nerror';
import { Response } from 'express';
import { StatusCode } from './http';

export const newError = (code, message) => new NError.VError({ info: { code } }, message);

export const sendError = (res, error) => {
  const status = (error.jse_info && error.jse_info.code) || 400;
  res.status(status).send({ Error: error.message });
};
