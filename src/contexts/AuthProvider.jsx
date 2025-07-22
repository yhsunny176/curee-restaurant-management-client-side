import React, { useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const storeJWTToken = async (firebaseUser) => {
        try {
            if (firebaseUser) {
                // Get Firebase ID token
                const token = await firebaseUser.getIdToken();
                // Store JWT token on client side
                localStorage.setItem("access-token", token);
                return token;
            } else {
                // Remove token when user logs out
                localStorage.removeItem("access-token");
                return null;
            }
        } catch (error) {
            console.error("Error storing JWT token:", error);
            return null;
        }
    };

    const getStoredToken = () => {
        return localStorage.getItem("access-token");
    };

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const updateUser = (updatedData) => {
        setLoading(false);
        return updateProfile(auth.currentUser, updatedData);
    };

    const logOut = () => {
        // Remove JWT token from client storage as required
        localStorage.removeItem("access-token");
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            // Store JWT token on client side when user state changes
            if (currentUser) {
                await storeJWTToken(currentUser);
            } else {
                localStorage.removeItem("access-token");
            }

            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authData = {
        user,
        setUser,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        updateUser,
        logOut,
        storeJWTToken,
        getStoredToken,
    };

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
