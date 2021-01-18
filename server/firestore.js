import admin from 'firebase-admin';
import { serviceAccount } from '../kingdom_keys.js';

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = firebaseAdmin.firestore();
// I tried to combine this with client/firebase.js but couldn't get it to work.