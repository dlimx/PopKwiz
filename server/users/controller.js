import { db } from '../firestore';
// import { User, userConverter } from '../models/userModel';
// import { User } from '../models/userModel';

// get users from firestore
export const getUsers = async (userQuery) => {

  const {username} = userQuery;
  let userSearch = '';
  if (username) {
    userSearch = db
      .collection('users')
      .where('username', '>=', username)
      .where('username', '<=', username + '\uf8ff');
  } else {
    userSearch = db.collection('users');
  }
  // create list for users and populate it with data in firestore
  let userList = [];
  await userSearch.get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      userList.push(doc.data())
    })
  })

  console.log(userList)
  return userList
 
};

// add users to firestore
export const addUser = async (user) => {
  console.log(user);

  // The signup function in frontend/src/contexts/AuthContext.js first adds the
  // new user to Firebase Auth. Then the uid created by Firebase auth is passed
  // here to the backend for adding the user to the Firestore db with the same
  // uid. The way this is done is by using `.set` instead of `.add`
  // NOTE: using `.doc()` without a parameter will automatically create and id.
  // In this case we want to use the id given to us by Firebase
  // https://firebase.google.com/docs/firestore/manage-data/add-data
  db.collection('users')
    .doc(user.uid)
    // .withConverter(userConverter)
    .set({username:user.username, email:user.email})
    
    // .then((doc) => {
    //   res.json({ message: `document ${doc.id} created successfully` });
    // })
    // .catch((err) => {
    //   res.status(500).json({ error: 'something went wrong' });
    //   console.error(err);
    // });
};
