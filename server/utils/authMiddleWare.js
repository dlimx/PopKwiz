import { firebaseAdmin } from '../database/firestore';

export function authMiddleWare(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.send({ message: 'Token Missing.' }).status(401);
  }

  if (authHeader && authHeader.split(' ')[0] !== 'Bearer') {
    res.send({ message: 'Invalid token' }).status(401);
  }

  const token = authHeader.split(' ')[1];
  firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then(() => next())
    .catch(() => res.send({ message: 'Authorization failed' }).status(403));

  return token;
}
