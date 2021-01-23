import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { isDevelopment } from '../utils/util';

let firebaseAuth;
if (isDevelopment()) {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
  const keyFile = fs.readFileSync(path.resolve(__dirname, '..', '..', 'keys.json'));
  const keys = JSON.parse(keyFile);
  firebaseAuth = admin.initializeApp({
    credential: admin.credential.cert(keys),
  });
} else {
  firebaseAuth = admin.initializeApp();
}

export const firebaseAdmin = firebaseAuth;

export const db = firebaseAdmin.firestore();
