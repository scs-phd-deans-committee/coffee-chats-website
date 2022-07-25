import React, { useEffect, useState } from 'react';
import { auth, firestore } from "../../../firebaseClient";
import { firebase } from '@firebase/app';
import "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
// import the stylesheet
import "react-step-progress/dist/index.css";
import "../styles.css"
import "react-dice-complete/dist/react-dice-complete.css";

function RemoteQuestion(props) {
    useEffect(() => {
        handleBtnClick(props.val);
    }, []);

    // Checking if the "Next" button can be set to valid
    function handleBtnClick(val) {
        // let isActive = (val === []) ? false : true;
        let isActive = (props.val === null) ? false : true;
        var next = document.getElementById("remote-next");
        if (isActive) {
        next.classList.add("active");
        next.disabled = false;
        next.onclick = props.clickToNextSection;
        } else {
        next.classList.remove("active");
        next.disabled = true;
        }
        props.setter(val);
        // console.log(val, remoteQVals);
    }
    return (
        <><div className="question-text">Where would you want to meet?</div>
        <ToggleButtonGroup className="answerArea" id="remote" type="radio" 
        name="remote" onChange={handleBtnClick} value={props.val}>
        <ToggleButton id="remote-1" value={"online"} variant="custom">
            Online
        </ToggleButton>
        <ToggleButton id="remote-2" value={"in_person"} variant="custom">
            In Person
        </ToggleButton>
        <ToggleButton id="remote-3" value={"both"} variant="custom">
            Both
        </ToggleButton>
        </ToggleButtonGroup>
        <br />
        <div className="question-nav">
        <Button id="remote-next" variant="custom-nav" 
        // disabled={props.val === null}
        onClick={props.clickToNextSection}>Next</Button>
        RemoteQValue: {props.val} 
        </div></>
    )
}

export default RemoteQuestion;