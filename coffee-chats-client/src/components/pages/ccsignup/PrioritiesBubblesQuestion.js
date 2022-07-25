import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { auth, firestore } from "../../../firebaseClient";
import { firebase } from '@firebase/app';
import "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import the stylesheet
import "react-step-progress/dist/index.css";
import "../styles.css";
import "react-dice-complete/dist/react-dice-complete.css";
import diffpriority_img from '../../../public/images/diffpriority.png';
import samepriority_img from '../../../public/images/samepriority.png';

function PrioritiesBubblesQuestion(props) {
  const numSizes = 5;
  const baseSize = 125;
  const interval = 10;
  function clickToNextSection() {
        props.setQuestion(props.questionNum + 1); 
        props.setCurSection(2);   
        };
        
  function clickToPrevSection() {
        props.setQuestion(props.questionNum - 1);
        props.setCurSection(1);
        };
  function handleBubbleClick(e) {
    const id = e.target.id;
    console.log(id);
    let bubble = document.getElementById(id);
    if (bubble === null) {console.log("couldn't find"); return;}
    const sizeStr = bubble.style.width;
    // width not yet set, so it is at the default size of 125px
    let newSize = 0;
    if (sizeStr == "") {
      newSize = baseSize + interval;
    } else {
      const size = parseInt(sizeStr.slice(0, sizeStr.length - 2));
      newSize = (size === baseSize + interval * (numSizes-1)) ? baseSize : (size + interval);
    }
    const newSizeStr = newSize.toString() + "px";
    bubble.style.maxWidth = newSizeStr;
    bubble.style.maxHeight = newSizeStr;
    bubble.style.width = newSizeStr;
    bubble.style.height = newSizeStr;
  }
  function resetSizes() {
    for (let i=0; i<props.factors.length; i++) {
      const factor = props.factors[i];
      let bubble = document.getElementById(factor);
      if (bubble === null) {continue;}
      const baseSizeStr = baseSize.toString() + "px";
      bubble.style.maxWidth = baseSizeStr;
      bubble.style.maxHeight = baseSizeStr;
      bubble.style.height = baseSizeStr;
    }
  }

  return (
    <>
    <Col className="priority-images-same">
      <Image src={samepriority_img} fluid/>
    </Col>
    <Col className="priority-images-diff">
      <Image src={diffpriority_img} fluid/>
    </Col>
    <Col className="priority-bubble-section">
    <div className="question-text">
      Your Priorities
    </div>
    <div className="question-sub-text">
    Click on the circle to indicate priority. The larger the circle, the higher priority. The circle size goes back to level 1 after reaching the maximum level.
    </div>
    <Button id="resetSizes" variant="custom-nav" onClick={resetSizes}>
        Reset Sizes
      </Button>
    <Row id="bubblesContainer">
      <Col id="sameBubbles">
          The Same As Me
      <Row id="selectedBubbles">
          {
        Object.entries(props.factorState).filter(([key, value], idx) => value === 0)
        .map(([key, value], idx) => 
        ((value !== 2) && 
        <Col> <div className="bubble" id={key} key={key} onClick={handleBubbleClick} 
        style={{marginTop: props.margins[idx], backgroundColor: "#A94152"}}>
          <img src={props.factorImgs[key]} />
          <div className="bubbleText">
            {props.factorNames[key]}
          </div>
          </div>
        </Col>))
      }
      </Row>
      </Col>
      <Col id="differentBubbles">
          Different From Me
          <Row id="selectedBubbles">
          {
        Object.entries(props.factorState).filter(([key, value], idx) => value === 1)
        .map(([key, value], idx) => 
        ((value !== 2) && 
        <Col> <div className="bubble" id={key} key={key} onClick={handleBubbleClick} 
        style={{marginTop: props.margins[idx], backgroundColor: "#3F3D56"}}>
          <img src={props.factorImgs[key]} />
          <div className="bubbleText">
            {props.factorNames[key]}
          </div>
        </div>
        </Col>))
      }
      </Row>
      </Col>
    </Row>
  
    <br />
    <div className="question-nav">
      <Button variant="custom-nav" onClick={clickToPrevSection}>Back</Button>
      <Button id="priorities-next" variant="custom-nav active"
      onClick={clickToNextSection}>Next</Button>
    </div>
    </Col>
    
    </>
    
  )
}

export default PrioritiesBubblesQuestion;