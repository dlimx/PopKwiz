import NError from '@netflix/nerror';

export const newError = (code, message) => new NError.VError({ info: { code } }, message);

export const sendError = (res, error) => {
  const status = (error.jse_info && error.jse_info.code) || 400;
  res.status(status).send({ Error: error.message });
};
