import React, { useEffect, useState } from 'react';
import { auth, firestore } from "../../../firebaseClient";
import { firebase } from '@firebase/app';
import "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button } from 'react-bootstrap';
// import the stylesheet
import "react-step-progress/dist/index.css";
import "../styles.css";
import ScheduleSelector from "react-schedule-selector";
import "react-dice-complete/dist/react-dice-complete.css";

function ReviewQuestion(props) {
    function clickToNextSection() {
            props.setQuestion(props.questionNum + 1); 
            props.setCurSection(4);   
            };
            
    function clickToPrevSection() {
            props.setQuestion(props.questionNum - 1);
            props.setCurSection(3);
            };
    return (
        <>
        <div className="results-container">
        <div className="question-text heading">On fire, Scotty!</div>
        <div className="question-sub-text">
        Check through your preferences one last time before you submit!
        </div>
        <div className="review-section twoCol-container-flex review-top">
        <div className="review-heading twoCol-left-flex">Activity:</div>
        <div className="review-text twoCol-right-flex">
            You prefer meeting <b>in person</b>, and would want to: <b>play sports, play a board game, or visit a museum.</b>
        </div>
        </div>
        <div className="review-section twoCol-container-flex">
        <div className="review-heading twoCol-left-flex">Expectations:</div>
        <div className="review-text twoCol-right-flex">
            You hope to <b>meet someone new</b> and <b>break away from work</b>. You also plan to participate in the Coffee Chats program <b>biweekly</b>.
        </div>
        </div>
        <div className="review-section twoCol-container-flex">
        <div className="review-heading twoCol-left-flex"></div>
        <div className="review-text twoCol-right-flex">You also prioritize the following factors:
        </div>
        </div>
        <div className="review-section twoCol-container-flex">
        <div className="review-heading twoCol-left-flex"></div>
        <div className="review-text twoCol-right-flex">
            <div id="bubbleContainer">
            {
                Object.entries(props.factorState)
                .map(([key, value], idx) => 
                ((value !== 2) && 
                <div className="bubble" id={key} key={key}
                style={{marginTop: props.margins[idx], backgroundColor: (value === 0)? "#A94152" : "#3F3D56"}}>
                <img src={props.factorImgs[key]} />
                <div className="bubbleText">
                    {props.factorNames[key]}
                </div>
                </div>))
            }
            </div>
            <div id="bubbleControls">
            <div className="legend">
                <div id="sameBubble" className="legendColor"></div>
                <div className="legendText">same</div>
            </div>
            <div className="legend">
                <div id="differentBubble" className="legendColor"></div>
                <div className="legendText">different</div>
            </div>
            </div>
        </div>
        </div>

        
        <div className="review-section twoCol-container-flex">
        <div className="review-heading twoCol-left-flex">Scheduling:</div>
        <div className="review-text twoCol-right-flex">
            <ScheduleSelector className="review-schedule"
            selection={[]}
            numDays={5}
            minTime={8}
            maxTime={22}
            hourlyChunks={1}
            />
        </div>
        </div>
        <div className="review-section twoCol-container-flex">
        <div className="review-heading twoCol-left-flex">Comments</div>
        <div className="review-text twoCol-right-flex">And lastly, you had no final comments to add!
        </div>
        </div>
        <div className="question-text">Does that sound right?</div>
        <br />
        <div className="question-nav">
        <Button id="submit-back" variant="custom-nav" onClick={clickToPrevSection}>No, let's go back</Button>
        <Button id="submit" variant="custom-nav" onClick={() => {props.updateSignup(props.signup); clickToNextSection()}}>
            Yes, let's submit!
        </Button>
        </div>
        </div>
    </>
    )
}

export default ReviewQuestion;