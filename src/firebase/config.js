import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

/* CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyCxkDPH8dmPBGzVYgURpN-5rmtRpKZSamA",
  authDomain: "taskbinder-11a3d.firebaseapp.com",
  projectId: "taskbinder-11a3d",
  storageBucket: "taskbinder-11a3d.appspot.com",
  messagingSenderId: "227753624729",
  appId: "1:227753624729:web:37d590336aa22f22d12408",
};

/* init firebase */
firebase.initializeApp(firebaseConfig);

/* init firebase services */
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

/* timestamp */
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
