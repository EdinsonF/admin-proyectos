import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDie1c4RM4jCZo-xT5O0ABJvHcceUoat2o",
  authDomain: "admin-proyect-f364d.firebaseapp.com",
  projectId: "admin-proyect-f364d",
  storageBucket: "admin-proyect-f364d.appspot.com",
  messagingSenderId: "615669565419",
  appId: "1:615669565419:web:60ed6b9ce16517176e7bae"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();