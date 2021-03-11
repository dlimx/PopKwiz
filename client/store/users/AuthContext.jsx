import React, { useContext, useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { auth, googleProvider } from '../../authentication/firebase';
import { postURL } from '../../api/PostURL';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// https://www.youtube.com/watch?v=qWy9ylc3f9U
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  // this a global API with auth token baked in - this way we can track the user
  // this is going to add a user to firebase auth as well as use the credential or uid created by firebase auth to
  // add the user to firestore. The postURL function acts as a form of frontend middleware (maybe?) between the
  // frontend and backend.
  async function signup(uname, uemail, password) {
    return auth.createUserWithEmailAndPassword(uemail, password).then((cred) =>
      postURL('/api/users', {
        uid: cred.user.uid,
        username: uname,
        email: uemail,
      }),
    );
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  async function loginWithGoogle() {
    return auth.signInWithPopup(googleProvider).then((cred) => {
      postURL('/api/users', {
        uid: cred.user.uid,
        username: cred.user.displayName,
        email: cred.user.email,
        picture: cred.user.photoURL,
      });
    });
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
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const newToken = await user.getIdToken();
        setToken(newToken);
      } else {
        setToken('');
      }
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    login,
    loginWithGoogle,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    token,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
