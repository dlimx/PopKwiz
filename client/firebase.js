import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from '../keys.js';

// moved firebase's config obj to kingdom_keys in order to group it with firestore's api key
const app = firebase.initializeApp(firebaseConfig);

// auth is used in client/AuthContext.js
export const auth = app.auth();
export default app;
