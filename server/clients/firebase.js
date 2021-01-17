import admin from 'firebase-admin';

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(''),
});

export const database = firebase.database();
