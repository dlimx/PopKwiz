import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../authentication/firebase';
import { postURL } from '../../api/PostURL';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // this is going to add a user to firebase auth as well as use the credential or uid created by firebase auth to
  // add the user to firestore. The postURL function acts as a form of frontend middleware (maybe?) between the
  // frontend and backend. https://www.youtube.com/watch?v=qWy9ylc3f9U
  function signup(uname, uemail, password) {
    auth.createUserWithEmailAndPassword(uemail, password).then((cred) => {
      return postURL('/api/users/add', {
        uid: cred.user.uid,
        username: uname,
        email: uemail,
      });
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
