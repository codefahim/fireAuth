import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "./Login.css";
import { FaGithub, FaYCombinator, FaGoogle } from "react-icons/fa";
import LoginSec from "../LoginSec/LoginSec";
import firebaseConfig from "./FirebaseConfig/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [classAdd, setClassAdd] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
    error: "",
    success: "",
  });

  //Google Sign  in system is
  const handleGoogleSignIn = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
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

  //   gitHub signIn system
  const handleGithubSignIn = () => {
    var githubProvider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((result) => {
        var user = result.user;
        console.log(user);
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

  //Yahoo login method
  const handleYahooSignIn = () => {
    var yahooProvider = new firebase.auth.OAuthProvider("yahoo.com");
    firebase
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

  //Custom reg system.
  const createUser = (e) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
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
        setUser(newUser);
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message);
        const newUser = {
          isSignedIn: false,
          error: error.message,
        };
        setUser(newUser);
      });
    e.preventDefault();
  };
  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    let valid = true;

    if (name === "email") {
      valid = /\S+@\S+\.\S+/.test(value);
    }
    if (name === "password") {
      valid = /^(?=.*[\w])(?=.*[\W])[\w\W]{8,}$/.test(value);
    }
    if (name === "name") {
      valid = true;
    }
    if (valid) {
      let newUser = { ...userData };
      newUser[name] = value;
      setUserData(newUser);
    }

    e.preventDefault();
  };
  console.log(userData);

  //New user Loggin
  const newUserLoggin = (e) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
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
        setUser(newUser);
      })
      .catch((error) => {
        const newUser = {
          isSignedIn: false,
          logError: error.message,
        };
        setUser(newUser);
      });
    e.preventDefault();
  };

  return (
    <div>
      <div
        className={`container ${classAdd ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form action="">
            <h1>Create Account</h1>
            <div className="social-container">
              <a onClick={handleGithubSignIn} className="social">
                <FaGithub></FaGithub>
              </a>
              <a onClick={handleYahooSignIn} className="social">
                <FaYCombinator />
              </a>
              <a onClick={handleGoogleSignIn} className="social">
                <FaGoogle></FaGoogle>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              onBlur={handleChange}
              name="name"
              placeholder="Name"
            />
            <input
              type="email"
              onBlur={handleChange}
              name="email"
              placeholder="Email"
            />
            <input
              type="password"
              onBlur={handleChange}
              name="password"
              placeholder="Password"
            />
            {user.isSignedIn && (
              <p style={{ color: "green" }}>{user.success}</p>
            )}
            {user.isSignedIn === false && (
              <p style={{ color: "red" }}>{user.error}</p>
            )}
            <button onClick={createUser}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="">
            <h1>Sign in</h1>
            <div className="social-container">
              <a onClick={handleGithubSignIn} className="social">
                <FaGithub></FaGithub>
              </a>
              <a onClick={handleYahooSignIn} className="social">
                <FaYCombinator />
              </a>
              <a onClick={handleGoogleSignIn} className="social">
                <FaGoogle></FaGoogle>
              </a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              name="email"
              onBlur={handleChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              onBlur={handleChange}
              placeholder="Password"
            />
            <a>Forgot your password?</a>
            {user.isSignedIn && (
              <p style={{ color: "green" }}>{user.logSuccess}</p>
            )}
            {user.isSignedIn === false && (
              <p style={{ color: "red" }}>{user.logError}</p>
            )}
            <button onClick={newUserLoggin}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={() => setClassAdd(!classAdd)}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>

              <button onClick={() => setClassAdd(!classAdd)} className="ghost">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
