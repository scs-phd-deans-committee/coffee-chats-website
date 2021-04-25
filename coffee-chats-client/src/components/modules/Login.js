import React, { useState } from 'react';

import { firebase } from '@firebase/app';
import "firebase/auth";

import { auth, firestore } from "../../firebaseClient";
import { Button, Modal, ModalDialog, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import {
  Redirect,
  useHistory
} from "react-router-dom";


function Login(props) {
  function handleLogin() {
    firestore.collection("users").doc("koqx3c761USdEmuq4X1A").get()
      .then((profileSnapshot) => {
        let profile = profileSnapshot.data();
        if (!props.user) {
          props.setUser({
            name: profile.name,
            pronoun: profile.pronoun,
            department: profile.department,
            year: profile.year,
            motto: profile.motto
          });
        }
        // history.push({
        //   pathname: "/profile",
        //   state: props.user
        // });
      })
  }
  function formatParams(params) {
    // iterate of all the keys of params as an array,
    // map it to a new array of URL string encoded key,value pairs
    // join all the url params using an ampersand (&).
    return Object.keys(params)
      .map((key) => key + "=" + encodeURIComponent(params[key]))
      .join("&");
  }

  function convertToJSON(res) {
    if (!res.ok) {
      throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
    }

    return res
      .clone() // clone so that the original is still readable for debugging
      .json() // start converting to JSON object
      .catch((error) => {
        // throw an error containing the text that couldn't be converted to JSON
        return res.text().then((text) => {
          throw `API request's result could not be converted to a JSON object: \n${text}`;
        });
      });
  }

  function get(endpoint, params = {}) {
    const fullPath = endpoint + "?" + formatParams(params);
    return fetch(fullPath)
      .then(convertToJSON)
      .catch((error) => {
        // give a useful error message
        throw `GET request to ${fullPath} failed with error:\n${error}`;
      });
  }

  // Helper code to make a post request. Default parameter of empty JSON Object for params.
  // Returns a Promise to a JSON Object.
  function post(endpoint, params = {}) {
    return fetch(endpoint, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(params),
    })
      .then(convertToJSON) // convert result to JSON object
      .catch((error) => {
        // give a useful error message
        throw `POST request to ${endpoint} failed with error:\n${error}`;
      });
  }

  
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Email/Password as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (authResult) => {
        console.log("signin success!");
        post('/login', {uid: auth.currentUser.uid, email: auth.currentUser.email})
          .then((res) => console.log(res));

        let userPromise = getOrCreateUser(auth.currentUser);
        userPromise.then(user => props.setUser(user));
        return false;
      }
    }
  }

  // TODO: move this to server side so that we can verify that email addresses are
  // using valid domains
  function getOrCreateUser(userQuery) {
    // the "sub" field means "subject", which is a unique identifier for each user
    console.log(userQuery);
    let userRef = firestore.collection("users").doc(userQuery.uid);
    let user = userRef.get()
      .then(userSnapshot => {
        if (userSnapshot.exists) {
          console.log("User exists");
          return userSnapshot.data();
        }
        else {
          console.log("Creating user");
          let data = {
            uid: userQuery.uid,
            email: userQuery.email,
            name: userQuery.displayName,
            pronoun: null,
            department: null,
            year: null,
            motto: null,
          };
          let newUser = userRef.set(data).then(() => {
            return data;
          });
          return newUser;
          // let newUser = firestore.collection("users").doc(userQuery.uid).set("email", "==", userQuery.email).get()
          //   .then((profileSnapshot) => {
          //   });
          // return newUser;
        }
      });
    return user;
  }

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
  )
}

export default Login;
