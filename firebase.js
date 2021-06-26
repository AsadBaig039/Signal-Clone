import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5QjeywEjozSeRKdbWfMN0q9SyPRfIddQ",
  authDomain: "signal-clone-6d8f2.firebaseapp.com",
  projectId: "signal-clone-6d8f2",
  storageBucket: "signal-clone-6d8f2.appspot.com",
  messagingSenderId: "637512537479",
  appId: "1:637512537479:web:78feba082b4aa59d926f22",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
