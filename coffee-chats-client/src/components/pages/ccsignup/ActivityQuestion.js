import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { auth, firestore } from "../../../firebaseClient";
import { firebase } from '@firebase/app';
import "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
// import the stylesheet
import "react-step-progress/dist/index.css";
import "../styles.css"
import "react-dice-complete/dist/react-dice-complete.css";
import signup_bg1 from '../../../public/images/signup_bg1.png';

function ActivityQuestion(props) {
  
    const indoorActivities = ["Create a DIY art project", "Get food or drinks", "Get food or drinks (no alcohol)", "Go to the gym", 
        "Go to a jazz club/cafe", "Just talk", "Make candles", "Manicure/Pedicure/Spa", "Paint and sip", "Play a board game", 
        "Tour each other's academic buildings", "Watch a CMU Drama production", "Visit a museum", "Watch a movie"];
    
    const outdoorActivities = ["Get coffee", "Go to an art gallery", "Go to a farmer's market", "Go to a music concert", 
        "Go on a walk", "Hammock at Schenley Park", "Hike", "Picnic", "Play sports", "Tour Phipps Conservatory"];
  
    // Filter activities displayed based on search input
    function filterActivities (e) {
      let input = e.target.value.toLowerCase();
      let allActivities = document.querySelectorAll("#indoor-activity, #outdoor-activity, #own-activity");
      console.log(allActivities);
      for (let j=0; j<allActivities.length; j++) {
          let activities = allActivities[j].children;
          for (let i=0; i<activities.length; i++) {
              let activity = activities[i];
              if (input === '') {
                  activity.style.display = "block";
              } else if (!activity?.firstChild?.value?.toLowerCase().includes(input)) {
                          activity.style.display = "none";
              }
          }
      }
    }
    
    // adds a new activity based on user's "other" input
    const handleInput = e => {
      if (e.key === 'Enter') {
        const value = document.getElementById("addActivityInput").value;
        props.setOwnActivitiesState([...props.ownActivitiesState, value]);
        props.setAddState("init");
      }
    }
    
    // update progress bar if next
    function clickToNextSection() {
      console.log("AT CLICK NEXT");
      props.setQuestion(props.questionNum + 1); 
      props.setCurSection(1);
    }
    // function clickToPrevSection() {
    //     setQuestion(questionNum - 1);
    //     setCurSection(0);
    //     }
    // Checking if the "Next" button can be set to valid
    function handleBtnClick(val) {
      let next = document.getElementById("activity-next");
    
      // check if any activities from any category are selected
      const anySelected = document.getElementById("Any activities work!").children[1].classList.contains("checked");
      
      const indoorActs = document.getElementById("indoor-activity").childNodes;
      const indoorSelected = [...indoorActs].filter((act) => act.children[1].classList.contains("checked")).length > 0;
                       
      const outdoorActs = document.getElementById("outdoor-activity").childNodes;
      const outdoorSelected = [...outdoorActs].filter((act) => act.children[1].classList.contains("checked")).length > 0;
  
      const ownActs = document.getElementById("own-activity").childNodes;
      const ownSelected = ownActs[0].getAttribute("id") === "addActivity" ? false : [...ownActs].filter((act) => act.getAttribute("id") !== "addActivity" && act.children[1].classList.contains("checked")).length > 0;
                       
      if (anySelected || indoorSelected || outdoorSelected || ownSelected) {
        console.log("next is on");
        next.classList.add("active");
        next.disabled = false;
        next.onclick = clickToNextSection;
      } else {
        next.classList.remove("active");
        next.disabled = true;
        console.log("next is off");
      }
    }
    return (
      <>
      <Image src={signup_bg1} id="activity-img" fluid/>
      <div className="question-text">
      What activities would you be interested in doing with your match?
      </div>
        
      <div className="question-sub-text">Please select around 5 activities!</div>
      <Row className="search-bar-and-any-option">
      <Col sm="8">
        <Form.Control className="search activity-search" placeholder="Search" onChange={filterActivities}/>
      </Col>
      <Col sm="3">
        <ToggleButtonGroup className="answerArea" id="any-activity" type="checkbox" 
          name="activity" onChange={handleBtnClick}>
          <ToggleButton key="Any activities work!" id="Any activities work!" value="Any activities work!" variant="custom" onChange={props.toggleCheckbox}>
            <span className="unchecked"></span>
                 Any activities work!
          </ToggleButton>
        </ToggleButtonGroup>
      </Col>
      </Row>
      
      <div className="activity-container">
        <div className="activity-scroll">
          <Row className="activity-category">
          Indoor
          </Row>
          <ToggleButtonGroup className="answerArea" id="indoor-activity" type="checkbox" 
            name="activity" onChange={handleBtnClick}>
            {indoorActivities.map((a) => (
              <ToggleButton key={a} id={a} value={a} variant="custom" onChange={props.toggleCheckbox}>
                <span className="unchecked"></span>
                {a}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Row className="activity-category">
            Outdoor
          </Row>
          <ToggleButtonGroup className="answerArea" id="outdoor-activity" type="checkbox" 
            name="activity" onChange={handleBtnClick}>
            {outdoorActivities.map((a) => (
              <ToggleButton key={a} id={a} value={a} variant="custom" onChange={props.toggleCheckbox}>
                <span className="unchecked"></span>
                {a}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Row className="activity-category">
            Add Your Own
          </Row>
          <ToggleButtonGroup className="answerArea" id="own-activity" type="checkbox" 
            name="activity" onChange={handleBtnClick}>
            {props.ownActivitiesState.map((a) => (
                <ToggleButton key={a} id={a} value={a} variant="custom" onChange={props.toggleCheckbox}>
                  <span className="unchecked"></span>
                  {a}
                </ToggleButton>
              ))}
            {/* displays initial state of add button, just the plus sign */}
            {props.addState === "init" &&
              <div className="addOption" id="addActivity" onClick={() => props.setAddState("input")}>
                <span className="add"></span>
              </div>
            }
            {/* displays input state of add button, including an input field */}
            {props.addState === "input" &&
              <div className="addOptionText" id="addActivity" onClick={() => props.setAddState("input")}>
                <span className="add addLeft"></span>
                <input id="addActivityInput" type="text" className="addInput" 
                placeholder="Your own activity!" onKeyUp={handleInput}/>
              </div>
            }
          </ToggleButtonGroup>
        </div>
      </div>
  
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={() => props.setQuestion(props.questionNum - 1)}>Back</Button>
        <Button id="activity-next" variant="custom-nav" disabled
        onClick={clickToNextSection}>Next</Button>
      </div>
      <div>
        Activities: {props.ownActivitiesState}
        Add state: {props.addState}
        QuestionNum: {props.questionNum}
      </div>
      </>
    )
}

export default ActivityQuestion;