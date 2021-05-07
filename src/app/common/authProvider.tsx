import React, { ReactNode, useContext } from 'react';
import firebase from 'firebase';

interface AuthContextProps {
  user?: firebase.User;
  signInWithGoogle: () => void;
  createUserWithEmailAndPassword: (email: string, password: string) => void;
  signInWithEmailAndPassword: (email: string, password: string) => void;
  signOut: () => void;
  error: string;
  loading: boolean;
  setError: (error: string) => void;
}

const AuthContext = React.createContext<AuthContextProps>({
  signInWithGoogle: () =>
    console.error(
      'useAuth() can be used only inside <AuthProvider> component.'
    ),
  createUserWithEmailAndPassword: () =>
    console.error(
      'useAuth() can be used only inside <AuthProvider> component.'
    ),
  signInWithEmailAndPassword: () =>
    console.error(
      'useAuth() can be used only inside <AuthProvider> component.'
    ),
  signOut: () =>
    console.error(
      'useAuth() can be used only inside <AuthProvider> component.'
    ),
  error: '',
  loading: false,
  setError: () =>
    console.error(
      'useAuth() can be used only inside <AuthProvider> component.'
    ),
});

interface AuthProviderProps {
  user?: any;
  signInWithGoogle: () => void;
  createUserWithEmailAndPassword: (email: string, password: string) => void;
  signInWithEmailAndPassword: (email: string, password: string) => void;
  signOut: () => void;
  error: string;
  loading: boolean;
  setError: (error: string) => void;
  children?: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  return (
    <AuthContext.Provider
      value={{
        user: props.user,
        signInWithGoogle: props.signInWithGoogle,
        signOut: props.signOut,
        signInWithEmailAndPassword: props.signInWithEmailAndPassword,
        createUserWithEmailAndPassword: props.createUserWithEmailAndPassword,
        error: props.error,
        loading: props.loading,
        setError: props.setError
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
