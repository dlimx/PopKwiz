import multer from 'multer';
import { UPLOAD_PATH } from '../../constants';

export const uploadMiddleware = multer({
  dest: UPLOAD_PATH,
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});
