import React from 'react';

import { firebase } from '@firebase/app';
import "firebase/auth";

import { auth, firestore } from "../firebaseClient";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// import { GoogleLogin } from 'react-google-login';
// import { GoogleLogout } from 'react-google-login';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";


function Login(props) {
  const history = useHistory();

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
          alert('Logged in');
        }
        history.push("/home");
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

  if (!props.user) {
    return (
      // <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
      // <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
      <div>
      <button onClick={handleLogin}>Login</button>
      </div>
    )
  } else {
    return (
      <Redirect to="/home" />
    )
  }

  // Need to look into cookies and stuff.

  // onLoginSuccess = (res) => {
  //   console.log('Login Success: currentUser:', res.profileObj);
  //   let name = res.profileObj.name;
  //   this.setState({'name': name, 'isLoggedIn': true, 'imgUrl': res.profileObj.imageUrl})
  // }

  // onLoginFailure = (res) => {
  //   console.log('Login failed: res:', res);
  // };

  // onLogoutSuccess = () => {
  //   console.log('Logout made successfully');
  //   alert('Logout successful, peace!');
  //   this.setState({'name': LOGGEDOUT, 'isLoggedIn': false, 'imgUrl': null})
  // };

  // render() {
  //   let comp;
  //   if (!this.state.isLoggedIn) {
  //     comp = <div>
  //         <h1>Not logged in.</h1>
  //         <br />
  //         <GoogleLogin
  //           clientId={clientId}
  //           buttonText="Login"
  //           onSuccess={this.onLoginSuccess}
  //           onFailure={this.onLoginFailure}
  //           cookiePolicy={'single_host_origin'}
  //           style={{ marginTop: '100px' }}
  //           isSignedIn={true}
  //         />
  //       </div>
  //   } else {
  //     comp = <div>
  //         <h1> Current User: {this.state.name} </h1>
  //         <img src={this.state.imgUrl} />
  //         <br /> <br />
  //         <GoogleLogout
  //         clientId={clientId}
  //         buttonText="Logout"
  //         onLogoutSuccess={this.onLogoutSuccess}
  //         />
  //       </div>
  //   }
  //   return (
  //     <div>
  //       {comp}
  //     </div>
  //   );
  // }
}

export default Login;
