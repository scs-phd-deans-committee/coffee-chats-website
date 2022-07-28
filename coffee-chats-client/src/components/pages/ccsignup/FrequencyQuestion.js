import React, { useEffect, useState } from 'react';
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
// import the stylesheet
import "react-step-progress/dist/index.css";
import "../styles.css";
import "react-dice-complete/dist/react-dice-complete.css";

function FrequencyQuestion(props) {
          
  function clickToNextSection() {
        props.setQuestion(props.questionNum + 1); 
        props.setCurSection(1);   
        };
        
  function clickToPrevSection() {
        props.setQuestion(props.questionNum - 1);
        props.setCurSection(1);
        };
  // Checking if the "Next" button can be set to valid
  function handleBtnClick(val) {
    let isActive = (val === []) ? false : true;
    let next = document.getElementById("frequency-next");
    if (isActive) {
      next.classList.add("active");
      next.disabled = false;
      next.onclick = clickToNextSection;
    } else {
      next.classList.remove("active");
      next.disabled = true;
    }
  }
  return (
    <><div className="question-text">
      How frequently do you want to participate in Coffee Chat meetups?
    </div>
    <ToggleButtonGroup className="answerArea" id="frequency" type="radio" 
    name="frequency" onChange={handleBtnClick}>
      <ToggleButton id="frequency-1" value={1} variant="custom">
        Once a month
      </ToggleButton>
      <ToggleButton id="frequency-2" value={2} variant="custom">
        Biweekly
      </ToggleButton>
      <ToggleButton id="frequency-3" value={3} variant="custom">
        Once a week
      </ToggleButton>
    </ToggleButtonGroup>
    <Button className="skip" variant="link" onClick={clickToNextSection}>
      Skip this question
    </Button>
    <br />
    <div className="question-nav">
      <Button variant="custom-nav" onClick={clickToPrevSection}>
        Back
      </Button>
      <Button  id="frequency-next" disabled variant="custom-nav" 
      onClick={clickToNextSection}>
        Next
      </Button>
    </div></>
  )
}

export default FrequencyQuestion;