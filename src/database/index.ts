import firebase from 'firebase';
import 'firebase/auth';

import { firebaseConfig } from './config';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();

export const firebaseAppAuth = firebaseApp.auth();
export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
