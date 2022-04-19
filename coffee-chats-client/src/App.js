import React, { useState, useEffect } from 'react';
import './App.css';
// import { Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import { firebase } from '@firebase/app';
import "firebase/auth";

import 'bootstrap/dist/css/bootstrap.min.css';

import { auth, firestore } from "./firebaseClient";

import CCNavbar from './components/modules/Navbar';
import Login from './components/modules/Login';

import MatchDetail from './components/pages/MatchDetail';
import MatchHistory from './components/pages/MatchHistory';
import Preferences from './components/pages/Preferences';
import Profile from './components/pages/Profile';
import CCSignUp from './components/pages/CCSignUp';
import Home from './components/pages/Home';
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
      <CCNavbar 
          user={user} setUser={setUser}
      />
      <Switch>
        <Route path="/profile">
          <Profile user={user} setUser={setUser} />
        </Route>
        <Route path="/feedback" component={() => { 
             window.open("https://docs.google.com/forms/d/e/1FAIpQLSe3446QlXkwdo41AfkdzcL1LcSrBpQNUsJTaXDrW-ncxWPtYA/viewform?usp=sf_link", "_blank") ||
                window.location.replace('https://docs.google.com/forms/d/e/1FAIpQLSe3446QlXkwdo41AfkdzcL1LcSrBpQNUsJTaXDrW-ncxWPtYA/viewform?usp=sf_link'); 
             return (
               <Redirect to="/"/>
             );
        }}/>
        <Route path="/matchlist">
          <MatchHistory user={user} setUser={setUser}/>
        </Route>
        <Route path="/match">
          <MatchDetail user={user} setUser={setUser}/>
        </Route>
        <Route path="/preferences">
          <Preferences user={user} setUser={setUser}/>
        </Route>
        <Route path="/ccsignup">
          <CCSignUp user={user} setUser={setUser} />
        </Route>
        <Route path="/">
          <Home user={user} setUser={setUser} />
        </Route>
      </Switch>
    </Router>
    </div>
    </>
  )
}

export default App;
