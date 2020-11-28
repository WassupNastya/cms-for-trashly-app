import { firebaseConfig } from 'config';
import firebase from 'firebase';

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
