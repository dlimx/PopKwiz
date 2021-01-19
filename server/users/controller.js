import { db } from '../firestore';
import { User, userConverter } from '../models/userModel';

// get users from firestore
export const getUsers = async (req, res) => {
  let uname = req.query.username;
  let userSearch = '';
  if (uname) {
    userSearch = db
      .collection('users')
      .where('username', '>=', uname)
      .where('username', '<=', uname + '\uf8ff');
  } else {
    userSearch = db.collection('users');
  }

  let found = await userSearch.get();
  let userList = [];
  for (const doc of found.docs) {
    userList.push(doc.data());
  }
  console.log(userList);
  return res.json(userList);
};

// add users to firestore
export const addUser = async (req, res) => {
  console.log(req.body);

  // The signup function in frontend/src/contexts/AuthContext.js first adds the
  // new user to Firebase Auth. Then the uid created by Firebase auth is passed
  // here to the backend for adding the user to the Firestore db with the same
  // uid. The way this is done is by using `.set` instead of `.add`
  // NOTE: using `.doc()` without a parameter will automatically create and id.
  // In this case we want to use the id given to us by Firebase
  // https://firebase.google.com/docs/firestore/manage-data/add-data
  db.collection('users')
    .doc(req.body.uid)
    .withConverter(userConverter)
    .set(new User(req.body.username, req.body.email))
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went wrong' });
      console.error(err);
    });
};
