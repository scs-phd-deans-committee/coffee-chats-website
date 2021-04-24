import React, { useState, useEffect } from 'react';
import './App.css';
// import { Link } from "react-router-dom";

import { firebase } from '@firebase/app';
import "firebase/auth";

import { auth, firestore } from "./firebaseClient";

import Login from './components/Login';
// import Logout from './components/Logout';

function App(props) {
  const [ user, setUser ] = useState(null);
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
  return (
    <>
    <div className="App">
    <Login setUser={setUser} user={user} />
    <h2>Coffee Chats ☕</h2>
    {user ? <h1>Hello {user.name}!</h1> : <h1>Not logged in.</h1>}
    </div>
    </>
  )
}

export default App;
