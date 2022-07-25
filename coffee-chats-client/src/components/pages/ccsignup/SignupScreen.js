import React from 'react';
import { Image, Button } from 'react-bootstrap';
import { auth, firestore } from "../../../firebaseClient";
import { firebase } from '@firebase/app';
import "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Link } from "react-router-dom";
// import the stylesheet
import "react-step-progress/dist/index.css";
import "../styles.css"
import "react-dice-complete/dist/react-dice-complete.css";
import submit_img from '../../../public/images/formsubmit.png';

function SignupScreen(props) {
    return (
        <>
        <Image src={submit_img} fluid className="submit-image"/>
        <div className="submitted-text">
            Congratulations on submitting!
        </div>
        <Button id="back-home" variant="custom-nav">
        <Link to="/ccnewhome" className="no-decor">Back to home </Link>
        </Button></>
    )
}

export default SignupScreen;