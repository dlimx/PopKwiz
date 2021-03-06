import firebase from 'firebase-admin';
import { newError } from '../utils/error';
import { StatusCode } from '../utils/http';

import { db } from '../client/db';
import { USERS } from '../../constants';
import { cache } from './cache';
import { avatarBucket, uploadFile } from '../client/storage';

// get users from firestore
export const getUsers = async (userQuery) => {
  const { username } = userQuery;
  let userSearch = '';
  if (username) {
    userSearch = db.collection(USERS).where('username', '>=', username).where('username', '<=', `${username}\uf8ff`);
  } else {
    userSearch = db.collection(USERS);
  }
  // create list for users and populate it with data in firestore
  const userList = [];
  await userSearch.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      userList.push(doc.data());
    });
  });

  return userList;
};

export const getUserById = async (userID) => {
  let user = cache.get(userID);
  console.log(`cached user: ${JSON.stringify(user)}`);
  if (user) return user;

  const doc = await db.collection(USERS).doc(userID).get();
  user = doc.data();
  console.log(user);
  cache.set(userID, user);
  return user;
};

// add users to firestore
export const addUser = async (user) => {
  const newUserID = user.uid; // from firebase. Will replace autogenerated id created by firestore for new documents.
  const now = firebase.firestore.Timestamp.now();
  const newUser = {
    username: user.username,
    email: user.email,
    id: newUserID,
    picture: user.picture || null,
    createdAt: now,
    updatedAt: now,
  };

  // https://firebase.google.com/docs/firestore/manage-data/add-data
  return db.collection(USERS).doc(newUserID).set(newUser);
};

export const updateUserImage = async (body, file, user) => {
  cache.del(user.uid);
  const data = body;
  console.log(user);
  try {
    if (file) {
      data.image = await uploadFile(avatarBucket, file);
    }
  } catch (error) {
    throw newError(StatusCode.BadRequest, error.message);
  }

  // update User's path to picture
  const now = firebase.firestore.Timestamp.now();
  const updatedUser = {
    picture: data.image,
    updatedAt: now,
  };

  // https://firebase.google.com/docs/firestore/manage-data/add-data
  db.collection(USERS).doc(user.uid).update(updatedUser);
  console.log(data.image);
  return data.image;
};

export const updateUserName = async (body, user) => {
  cache.del(user.uid);
  const { username } = body;

  // update User's path to picture
  const now = firebase.firestore.Timestamp.now();
  const updatedUser = {
    username,
    updatedAt: now,
  };

  // https://firebase.google.com/docs/firestore/manage-data/add-data
  return db.collection(USERS).doc(user.uid).update(updatedUser);
};

export const updateEmail = async (body, user) => {
  cache.del(user.uid);
  const { email } = body;

  // update User's path to picture
  const now = firebase.firestore.Timestamp.now();
  const updatedUser = {
    email,
    updatedAt: now,
  };

  // https://firebase.google.com/docs/firestore/manage-data/add-data
  return db.collection(USERS).doc(user.uid).update(updatedUser);
};

export const updatePassword = async (body, user) => {
  cache.del(user.uid);
  const { password } = body;

  // update User's path to picture
  const now = firebase.firestore.Timestamp.now();
  const updatedUser = {
    password,
    updatedAt: now,
  };

  // https://firebase.google.com/docs/firestore/manage-data/add-data
  return db.collection(USERS).doc(user.uid).update(updatedUser);
};
