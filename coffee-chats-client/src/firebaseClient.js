import { firebase } from '@firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBEDNCzqd9ibX3DlAfaFNBcrjANmwR2rSk",
  authDomain: "coffee-chats-6d449.firebaseapp.com",
  projectId: "coffee-chats-6d449",
  storageBucket: "coffee-chats-6d449.appspot.com",
  messagingSenderId: "544714166047",
  appId: "1:544714166047:web:05202e6dc1d51b8c7daa2a"
};

if(!firebase.apps.length) {
  var firebaseInit = firebase.initializeApp(firebaseConfig);
}

export var auth = firebase.auth();
export var firestore = firebase.firestore();
export var storage = firebase.storage();

