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
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleLogin() {
    handleShow();
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



  // function getOrCreateUser(userQuery) {
  //   // the "sub" field means "subject", which is a unique identifier for each user
  //   console.log(userQuery);
  //   let userRef = admin.firestore.collection("users").doc(userQuery.uid);
  //   let user = userRef.get()
  //     .then(userSnapshot => {
  //       if (userSnapshot.exists) {
  //         console.log("User exists");
  //         return userSnapshot.data();
  //       }
  //       else {
  //         console.log("Creating user");
  //         let newUser = admin.firestore.collection("profiles").where("email", "==", userQuery.email).get()
  //           .then((profileSnapshot) => {
  //             let data = {
  //               uid: userQuery.uid,
  //               email: userQuery.email,
  //               displayName: userQuery.displayName,
  //               profileId: profileSnapshot.docs[0].id
  //             };
  //             let newUser = userRef.set(data).then(() => {
  //               return data;
  //             });
  //             return newUser;
  //           });
  //         return newUser;
  //       }
  //     });
  //   return user;
  // }

  // const uiConfig = {
  //   // Popup signin flow rather than redirect flow.
  //   signInFlow: 'popup',
  //   // We will display Google and Email/Password as auth providers.
  //   signInOptions: [
  //     firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID
  //   ],
  //   callbacks: {
  //     // Avoid redirects after sign-in.
  //     signInSuccessWithAuthResult: (authResult) => {
  //       console.log("signin success!");
  //       let currentUser = auth.currentUser;
  //       let token = currentUser.getIdToken(true);
  //       getOrCreateUser(
  //       // token.then((idToken) => {
  //       //   props.setUser(....);
  //       // });
  //       // if (!currentUser.emailVerified) {
  //       //   console.log("not verified");
  //       //   currentUser.sendEmailVerification();
  //       // }
  //       // token.then((idToken) => {
  //       //   let displayName = currentUser.displayName;
  //       //   let email = currentUser.email;
  //       //   let loginResponse = {"token": idToken, "displayName": displayName, "email": email}
  //       //   console.log("logging in");
  //       //   props.handleLogin(loginResponse);
  //       // });
  //       return false;
  //     }
  //   }
  // }
  const uiConfig = {}

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Login
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      { props.user ?
        <></> 
        :
        <>
          <div>
            <button onClick={handleLogin}>Login</button>
          </div>
        </>
      }
    </>
    // <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
    // <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
  )
}

export default Login;
