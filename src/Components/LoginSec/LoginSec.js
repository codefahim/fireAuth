import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Login/FirebaseConfig/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
