import React from 'react';

import { firebase } from '@firebase/app';
import "firebase/auth";

import { auth, firestore } from "../firebaseClient";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";

// import Navbar from './modules/Navbar';

function Home(props) {
  const history = useHistory();
  const logoutButton = 
    <button onClick={() => {
      props.setUser(null);
      localStorage.removeItem("user");
      history.push("/");
    }}>Logout!</button>


  if (props.user) {
    return (
      <div className="homeContainer">
        <div className="home">
          <div className="textContainer">
            <div className="name">Welcome: {props.user.name}</div>
          </div>
          <button onClick={() => {
            history.push("/profile");
          }}>Go to my profile</button>

          {logoutButton}
        </div>
      </div>
    )
  } else {
    return (
      <Redirect to="/" />
    )
  }
}

export default Home;
