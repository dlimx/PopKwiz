// needs to be updated.
// used in server/users/controller.js
export const User = class User {
  constructor(username, email) {
    (this.username = username), (this.email = email);
  }
  toString() {
    return this.username + ', ' + this.email;
  }
}
// https://firebase.google.com/docs/firestore/manage-data/add-data
// need to convert class object to be compatible with Firestore
export const userConverter = {
  toFirestore: (user) => {
    return {
      username: user.username,
      email: user.email,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(data.username, data.email);
  },
};

