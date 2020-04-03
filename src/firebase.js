import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "zengarden-14251.firebaseapp.com",
  databaseURL: "https://zengarden-14251.firebaseio.com",
  projectId: "zengarden-14251",
  storageBucket: "zengarden-14251.appspot.com",
  messagingSenderId: "592463493439",
  appId: "1:592463493439:web:7089c6beb59b47da6d3b8a",
  measurementId: "G-QBV38XX51P"
});

const db = firebaseApp.firestore();

export { firebaseApp, db };
