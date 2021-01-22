import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAX0ztYQLBWaTdqizTHDcm7u6uBY6ECAGM',
  authDomain: 'popkwiz.firebaseapp.com',
  projectId: 'popkwiz',
  databaseURL: 'https://popkwiz.firebaseio.com',
  storageBucket: 'popkwiz.appspot.com',
  messagingSenderId: '73392967405',
  appId: '1:73392967405:web:2772dfe8e9cfe40676c6e4',
  measurementId: 'G-DJPQDVGCWE',
};

// moved firebase's config obj to kingdom_keys in order to group it with firestore's api key
export const app = firebase.initializeApp(firebaseConfig);

// auth is used in client/AuthContext.js
export const auth = app.auth();

// Google provider
export const googleProvider = new firebase.auth.GoogleAuthProvider()