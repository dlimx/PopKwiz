import { firebaseAdmin } from '../client/firebase';
import { StatusCode } from '../utils/http';
import { newError, sendError } from '../utils/error';
import { getUserById } from './controller';

const hasAuthHeader = (req) => {
  return req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer';
};

const getAuthToken = (req) => {
  return req.headers.authorization.split(' ')[1];
};

const getAuthUser = async (token) => {
  try {
    const firebaseUser = await firebaseAdmin.auth().verifyIdToken(token);
    const firestoreUser = await getUserById(firebaseUser.uid);
    return {
      id: firebaseUser.uid,
      ...firebaseUser,
      ...firestoreUser,
    };
  } catch (e) {
    throw newError(StatusCode.Forbidden, 'Forbidden');
  }
};

export async function authMiddleware(req, res, next) {
  if (!req.user) {
    res.send({ message: 'Unauthorized' }).status(StatusCode.Unauthorized);
    next(new Error('Unauthorized'));
  } else {
    next();
  }
}

export async function userMiddleWare(req, res, next) {
  if (hasAuthHeader(req)) {
    const token = getAuthToken(req);
    req.user = {};
    try {
      req.user = await getAuthUser(token);

      next();
    } catch (e) {
      next();
    }
  } else {
    next();
  }
}
