import React, { ReactNode, useContext, useEffect, useState } from 'react';
import firebase from 'firebase';
import { firebaseAppAuth, providers } from 'database';

interface AuthContextProps {
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  loginWithGoogle: () => Promise<firebase.auth.UserCredential>;
  signOut: () => Promise<void>;
  user?: firebase.User;
}

const AuthContext = React.createContext<AuthContextProps>({
  signInWithEmailAndPassword: () =>
    new Promise(() => console.error('useAuth() error')),
  signUpWithEmailAndPassword: () =>
    new Promise(() => console.error('useAuth() error')),
  loginWithGoogle: () => new Promise(() => console.error('useAuth() error')),
  signOut: () => new Promise(() => console.error('useAuth() error')),
});

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<firebase.User>();

  const signInWithEmailAndPassword = (email: string, password: string) =>
    firebaseAppAuth.signInWithEmailAndPassword(email, password);

  const signUpWithEmailAndPassword = (email: string, password: string) =>
    firebaseAppAuth.createUserWithEmailAndPassword(email, password);

  const loginWithGoogle = () =>
    firebaseAppAuth.signInWithPopup(providers.googleProvider);

  const signOut = () => firebaseAppAuth.signOut();

  useEffect(() => {
    firebaseAppAuth.onAuthStateChanged((userAuth) => setUser(userAuth));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInWithEmailAndPassword,
        signUpWithEmailAndPassword,
        loginWithGoogle,
        signOut,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
