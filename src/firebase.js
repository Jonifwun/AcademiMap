import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "mediapp-87f1e.firebaseapp.com",
    databaseURL: "https://mediapp-87f1e.firebaseio.com",
    projectId: "mediapp-87f1e",
    storageBucket: "mediapp-87f1e.appspot.com",
    messagingSenderId: "170099201547",
    appId: "1:170099201547:web:0da0b061508013bfb0190e",
    measurementId: "G-8FH0LNTVF3"
  }); 

  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()

  export { db, auth, storage }