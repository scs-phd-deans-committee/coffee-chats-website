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
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        'https://www.googleapis.com/auth/contacts.readonly'
      ],
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: 'select_account'
      }
    },
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (authResult) => {
        console.log("signin success!");
        let currentUser = auth.currentUser;
        let token = currentUser.getIdToken(true);                                                                                                                                                                                                             
        if (!currentUser.emailVerified) {
          console.log("not verified");
          currentUser.sendEmailVerification();
        }   
        token.then((idToken) => {
          let displayName = currentUser.displayName;
          let email = currentUser.email;
          post('/login', {token: idToken, uid: currentUser.uid, email: currentUser.email, displayName: currentUser.displayName})
            .then(res => {
              console.log(res, currentUser.uid);
              if (Object.keys(res).length > 0) {
                props.setUser(res);
              }
              else {
                props.setUser("Invalid");
              }
            });
        }); 
        return false;
      }
    }
  }

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
  )
}

export default Login;
