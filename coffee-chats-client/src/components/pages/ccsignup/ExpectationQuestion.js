import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
// import the stylesheet
import "react-step-progress/dist/index.css";
import "../styles.css";
import "react-dice-complete/dist/react-dice-complete.css";
import signup_bg2 from '../../../public/images/signup_bg2.png';

function ExpectationQuestion(props) {
  const expectations = ["Meet someone new", "Establish a friendship", 
  "Break away from work", "Talk about research", "Find a hobby partner", "No expectations in particular"]
  const [expectState, setExpectState] = useState(expectations);
        
  // for progress bar if previous
  function clickToNextSection() {
        props.setQuestion(props.questionNum + 1);
        props.setCurSection(1);
        }
        
  function clickToPrevSection() {
        props.setQuestion(props.questionNum - 1);
        props.setCurSection(0);
        }
  // Checking if the "Next" button can be set to valid
  function handleBtnClick(val) {
    let next = document.getElementById("expectation-next");
    if (val.length) {
      next.classList.add("active");
      next.disabled = false;
      next.onclick = clickToNextSection;
    } else {
      next.classList.remove("active");
      next.disabled = true;
    }
  }
  return (
    <>
      <Image src={signup_bg2} id="expectation-img" fluid/>
      <div className="question-text">My expectation(s) for the Coffee Chat program are to . . .</div>
    <div className="question-sub-text">Your answer(s) will be shared with your match!</div>
    <ToggleButtonGroup className="answerArea" id="expectation" type="checkbox" 
    name="expectation" onChange={handleBtnClick}>
      {expectState.map((e) => (
        <ToggleButton key={e} id={e} value={e} variant="custom" onChange={props.toggleCheckbox}>
          <span className="unchecked"></span>
          {e}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
    <br />
    <div className="question-nav">
      <Button variant="custom-nav" onClick={clickToPrevSection}>Back</Button>
      <Button id="expectation-next" variant="custom-nav" disabled
      onClick={clickToNextSection}>Next</Button>
    </div></>
  )
}

export default ExpectationQuestion;