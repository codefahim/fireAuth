import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Login/FirebaseConfig/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const googleLogIn = () => {
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      var user = result.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
};
///
export const githubLogin = () => {
  var provider = new firebase.auth.GithubAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;

      var user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
};
//Yahoo login

export const yahooLogin = () => {
  var yahooProvider = new firebase.auth.OAuthProvider("yahoo.com");
  return firebase
    .auth()
    .signInWithPopup(yahooProvider)
    .then((result) => {
      const credential = result.credential;
      var accessToken = credential.accessToken;
      var idToken = credential.idToken;
      console.log(result);
    })
    .catch((error) => {
      // Handle error.
    });
};

//custom email and pass user register
export const customEmailPassReg = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      const newUser = {
        isSignedIn: true,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        error: "",
        success: "Congratulations! You have successfully registered",
        logError: "",
        logSuccess: "",
      };
      return newUser;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.message);
      const newUser = {
        isSignedIn: false,
        error: error.message,
      };
      return newUser;
    });
};

// loggin system with custom emal and pass
export const userLoginWithCustomEmail = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      const newUser = {
        isSignedIn: true,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        error: "",
        logSuccess: "Congratulations! You have successfully Login",
      };
      return newUser;
    })
    .catch((error) => {
      const newUser = {
        isSignedIn: false,
        logError: error.message,
      };
      return newUser;
    });
};
