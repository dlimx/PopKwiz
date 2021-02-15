import firebase from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { isDevelopment } from '../utils/util';

let firebaseAuth;
if (isDevelopment()) {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
  const keyFile = fs.readFileSync(path.resolve(__dirname, '..', '..', 'keys.json'));
  const keys = JSON.parse(keyFile);
  firebaseAuth = firebase.initializeApp({
    credential: firebase.credential.cert(keys),
  });
} else {
  firebaseAuth = firebase.initializeApp();
}

export const firebaseAdmin = firebaseAuth;

export const db = firebaseAdmin.firestore();
