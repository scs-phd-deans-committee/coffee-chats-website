import React, { useEffect, useState } from 'react';
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
// import the stylesheet
import "react-step-progress/dist/index.css";
import "../styles.css";
import "react-dice-complete/dist/react-dice-complete.css";

function PrioritiesQuestion(props) {
  const options = ["the same as mine", "different than mine", "anything works!"];        

  function clickToNextSection() {
    // check if "anything works" was selected for all factors
    let skip = true;
    const anythingIdx = 2;
    for (let k in props.factorState) {
      if (props.factorState[k] !== anythingIdx) {
        skip = false;
      }
    }

    if (skip) {
      skipSection();
    } else {
      props.setQuestion(props.questionNum + 1); 
      props.setCurSection(1);   
    }
  };

  function skipSection() {
        props.setQuestion(props.questionNum + 2); 
        props.setCurSection(2);   
        };
        
  function clickToPrevSection() {
        props.setQuestion(props.questionNum - 1);
        props.setCurSection(1);
        };
  const handleChange = val => {
    const [factor, option] = val.split("-");
    props.factorState[factor] = parseInt(option);
    props.setFactorState(props.factorState);

    let next = document.getElementById("priorities-next");
    if (Object.keys(props.factorState).length === props.factors.length) {
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
      What characteristics do you want to prioritize in your match?
    </div>
    <Button className="skip" variant="link" onClick={skipSection}>
      Skip this question
    </Button>
    <div id='factors'>
      <div className="factor-section">
        <div className="factor-question">
          <div className="factor-num">1.</div>
          <div className="factor-text">I care that my match’s <b>academic interests</b> are</div>
        </div>
        <ToggleButtonGroup key="academic" className="factor-options" onChange={handleChange} type="radio" 
        name="academic">
          {options.map((option, idx) => (
            <ToggleButton name={`academic-${idx}`} key={`academic-${idx}`}
            value={`academic-${idx}`} variant="custom">{option}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <div className="factor-section">
        <div className="factor-question">
          <div className="factor-num">2.</div>
          <div className="factor-text">I care that my match’s <b>college</b> is</div>
        </div>
        <ToggleButtonGroup key="college" className="factor-options" onChange={handleChange} type="radio" 
        name="college">
          {options.map((option, idx) => (
            <ToggleButton name={`college-${idx}`} key={`college-${idx}`}
            value={`college-${idx}`} variant="custom">{option}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <div className="factor-section">
        <div className="factor-question">
          <div className="factor-num">3.</div>
          <div className="factor-text">I care that my match’s <b>hobbies</b> are</div>
        </div>
        <ToggleButtonGroup key="hobbies" className="factor-options" onChange={handleChange} type="radio" 
        name="hobbies">
          {options.map((option, idx) => (
            <ToggleButton name={`hobbies-${idx}`} key={`hobbies-${idx}`}
            value={`hobbies-${idx}`} variant="custom">{option}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <div className="factor-section">
        <div className="factor-question">
          <div className="factor-num">4.</div>
          <div className="factor-text">I care that my match’s <b>year at CMU</b> is</div>
        </div>
        <ToggleButtonGroup key="year" className="factor-options" onChange={handleChange} type="radio" 
        name="year">
          {options.map((option, idx) => (
            <ToggleButton name={`year-${idx}`} key={`year-${idx}`}
            value={`year-${idx}`} variant="custom">{option}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <div className="factor-section">
        <div className="factor-question">
          <div className="factor-num">5.</div>
          <div className="factor-text">I care that my match’s <b>background</b> is</div>
        </div>
        <ToggleButtonGroup key="background" className="factor-options" onChange={handleChange} type="radio" 
        name="background">
          {options.map((option, idx) => (
            <ToggleButton name={`background-${idx}`} key={`background-${idx}`}
            value={`background-${idx}`} variant="custom">{option}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
    <br />
    <div className="question-nav">
      <Button variant="custom-nav" onClick={clickToPrevSection}>Back</Button>
      <Button id="priorities-next" variant="custom-nav" disabled
      onClick={clickToNextSection}>Next</Button>
    </div></>
  )
}

export default PrioritiesQuestion;