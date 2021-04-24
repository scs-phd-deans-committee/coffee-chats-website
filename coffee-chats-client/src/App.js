import React, { useState, useEffect } from 'react';
import './App.css';
// import { Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import { firebase } from '@firebase/app';
import "firebase/auth";

import { auth, firestore } from "./firebaseClient";

import Login from './components/Login';
import Profile from './components/Profile';
// import Logout from './components/Logout';

function App(props) {
  const [ user, setUser ] = useState(null);

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  });

    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
  return (
    <>
    <div className="App">
    <Router>
      <Switch>
        <Route path="/profile">
          <Profile user={user} setUser={setUser} />
        </Route>
        <Route path="/">
          <Login setUser={setUser} user={user} />
        </Route>
      </Switch>
    </Router>
    </div>
    </>
  )
}

export default App;
