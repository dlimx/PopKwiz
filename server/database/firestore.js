import admin from 'firebase-admin';
import { serviceAccount } from './keys';

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = firebaseAdmin.firestore();
