import React, { useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from './AuthContext';

const auth = getAuth(app);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    }
  }, []);


  const authData = {
    user,
    setUser,
    loading
  }


  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
};

export default AuthProvider;