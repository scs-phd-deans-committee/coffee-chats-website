import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button, Form, Modal, ModalDialog, ModalHeader, ModalTitle, ModalBody, 
  ModalFooter, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { auth, firestore } from "../../../firebaseClient";
import { firebase } from '@firebase/app';
import "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Link } from "react-router-dom";
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import "../styles.css";
import "react-dice-complete/dist/react-dice-complete.css";
import academic_img from '../../../public/images/academic.png';
import college_img from '../../../public/images/college.png';
import hobbies_img from '../../../public/images/hobbies.png';
import year_img from '../../../public/images/year.png';
import background_img from '../../../public/images/background.png';
import { useForm, Controller, useController } from "react-hook-form";

import RemoteQuestion from './RemoteQuestion';
import ActivityQuestion from './ActivityQuestion';
import ExpectationQuestion from './ExpectationQuestion';
import FrequencyQuestion from './FrequencyQuestion';
import PrioritiesQuestion from './PrioritiesQuestion';
import PrioritiesBubblesQuestion from './PrioritiesBubblesQuestion';
import AvailabilityQuestion from './AvailabilityQuestion';
import DiceRollQuestion from './DiceRollQuestion';
import CommentsQuestion from './CommentsQuestion';
import ReviewQuestion from './ReviewQuestion';
import SignupScreen from './SignupScreen';


function CCSignUp(props) {
  const questions = ['remote', 'activity', 'expectation', 'frequency', 'priorities', 'prioritiesBubbles', 'availability',
  'diceroll', 'comments', 'review', 'submit'];
  const [questionNum, setQuestion] = useState(0);
  
  const [signup, setSignup] = useState({"isRemote": true, "availability":"Mornings"});
  const updateSignup = (data) => {
    console.log('form submitted!')
    data = {...data, uid: props.user.uid, response_time: firebase.firestore.FieldValue.serverTimestamp()}
    Object.keys(data).forEach(function(key) {
      if(data[key] === null | data[key] === undefined) {
          data[key] = '';
      }
    })

    console.log(data)

    firestore.collection('signups').add({
        uid: props.user.uid,
        ...data
    });
  }

  /* STEP PROGRESS BAR */ 

  /* sync progress bar with question content */
  const [curSection, setCurSection] = useState(0);
  function clickToNextSection() {
    setQuestion(questionNum + 1); 
    setCurSection(0);
  }
  
  function ProgressBar(props) {
          
      return(
      <StepProgressBar
        startingStep={curSection}
        steps={[
           {
            label: "Activities",
            name: "Activities",
          },
           {
            label: "Expectations",
            name: "Expectations",
          },
           {
            label: "Availability",
            name: "Availability",
          },
          {
            label: "Comments",
            name: "Comments",
            
          },
          {
            label: "Submit!",
            name: "Submit!",
            
          }
        ]}
      />
      )
  }

  
  /* END OF STEP PROGRESS BAR */

  const [remoteQVals, setRemoteQVals] = useState(null);

  // Toggle checkbox icon when button is clicked or unclicked
  function toggleCheckbox (e) {
    let box = document.getElementById(e.target.value).children[1];
    if (box.classList.contains("unchecked")) {
      box.classList.remove("unchecked");
      box.classList.add("checked");
    } else {
      box.classList.remove("checked");
      box.classList.add("unchecked");
    }
  }
 

  const factors = ["academic", "college", "hobbies", "year", "background"];
  const factorNames = 
    {"academic": "academic interests", 
    "college": "colleges & departments",
    "hobbies": "hobbies & interests",
    "year": "year at CMU",
    "background": "background",
    };
  const factorImgs = 
    {"academic": academic_img, 
    "college": college_img,
    "hobbies": hobbies_img,
    "year": year_img,
    "background": background_img,
    };
  
  const [factorState, setFactorState] = useState({});

  

  // randomly generate 5 bubble positions, stays static through entire flow
  const [margins, setMargins] = useState([]);
  if (margins.length == 0) {
    for (let i=0; i<5; i++) {
      let margin = Math.floor(Math.random() * 100);
      // alternate heights
      if (i % 2 == 0) {
        margin += 100;
      }
      const marginStr = margin.toString() + "px"
      setMargins(margins => [...margins, marginStr]);
    }
  }

          
                
  //this is to prevent rerolling
  const [diceState, setDiceState] = useState(0); 
 
  
  const [addState, setAddState] = useState("init");
  const [ownActivitiesState, setOwnActivitiesState] = useState([]);
  function QuestionArea(props) {
    return (
        <Row className="question-area flex-column align-items-center">
          {/* can refactor this switch statement and take out question-text and question-nav if we want */}
          {(() => {
            switch (questions[props.questionNum]) {
              case 'remote':
                return <RemoteQuestion val={remoteQVals} 
                  setter={setRemoteQVals} clickToNextSection={clickToNextSection}/>
              case 'activity':
                return <ActivityQuestion 
                  ownActivitiesState={ownActivitiesState} setOwnActivitiesState={setOwnActivitiesState}
                  addState={addState} setAddState={setAddState}
                  questionNum={questionNum} setQuestion={setQuestion}
                  setCurSection={setCurSection}
                  toggleCheckbox={toggleCheckbox} />
              case 'expectation':
                return <ExpectationQuestion ownActivitiesState={ownActivitiesState} setOwnActivitiesState={setOwnActivitiesState}
                addState={addState} setAddState={setAddState}
                questionNum={questionNum} setQuestion={setQuestion}
                setCurSection={setCurSection}
                toggleCheckbox={toggleCheckbox} />
              case 'frequency':
                return <FrequencyQuestion ownActivitiesState={ownActivitiesState} setOwnActivitiesState={setOwnActivitiesState}
                addState={addState} setAddState={setAddState}
                questionNum={questionNum} setQuestion={setQuestion}
                setCurSection={setCurSection}
                toggleCheckbox={toggleCheckbox} />
              case 'priorities':
                return <PrioritiesQuestion ownActivitiesState={ownActivitiesState} setOwnActivitiesState={setOwnActivitiesState}
                addState={addState} setAddState={setAddState}
                questionNum={questionNum} setQuestion={setQuestion}
                setCurSection={setCurSection}
                toggleCheckbox={toggleCheckbox} factors={factors} factorState={factorState} setFactorState={setFactorState} />
              case 'prioritiesBubbles':
                return <PrioritiesBubblesQuestion ownActivitiesState={ownActivitiesState} setOwnActivitiesState={setOwnActivitiesState}
                addState={addState} setAddState={setAddState}
                questionNum={questionNum} setQuestion={setQuestion} setCurSection={setCurSection}
                toggleCheckbox={toggleCheckbox} margins={margins} factorImgs={factorImgs} factorNames={factorNames}
                factors={factors} factorState={factorState} setFactorState={setFactorState} />
              case 'availability':
                return <AvailabilityQuestion ownActivitiesState={ownActivitiesState} setOwnActivitiesState={setOwnActivitiesState}
                addState={addState} setAddState={setAddState}
                questionNum={questionNum} setQuestion={setQuestion} setCurSection={setCurSection}
                toggleCheckbox={toggleCheckbox} />    
              case 'diceroll':
                return <DiceRollQuestion ownActivitiesState={ownActivitiesState} setOwnActivitiesState={setOwnActivitiesState}
                addState={addState} setAddState={setAddState}
                questionNum={questionNum} setQuestion={setQuestion} setCurSection={setCurSection}
                toggleCheckbox={toggleCheckbox} />
              case 'comments':
                return <CommentsQuestion ownActivitiesState={ownActivitiesState} setOwnActivitiesState={setOwnActivitiesState}
                addState={addState} setAddState={setAddState}
                questionNum={questionNum} setQuestion={setQuestion} setCurSection={setCurSection}
                toggleCheckbox={toggleCheckbox} />
              case 'review':
                return <ReviewQuestion ownActivitiesState={ownActivitiesState} setOwnActivitiesState={setOwnActivitiesState}
                addState={addState} setAddState={setAddState}
                questionNum={questionNum} setQuestion={setQuestion} setCurSection={setCurSection}
                toggleCheckbox={toggleCheckbox} margins={margins} factorImgs={factorImgs} factorNames={factorNames}
                factors={factors} factorState={factorState} signup={signup} updateSignup={updateSignup} />
              case 'submit':
                return <SignupScreen ownActivitiesState={ownActivitiesState} setOwnActivitiesState={setOwnActivitiesState}
                addState={addState} setAddState={setAddState}
                questionNum={questionNum} setQuestion={setQuestion} setCurSection={setCurSection}
                toggleCheckbox={toggleCheckbox} />
              default:
                return null
            }
          })()}
        </Row>
    );
  }

  return (
    <Container fluid>
      <Row className="flex-column align-items-center">
        <ProgressBar/>
        <QuestionArea questionNum={questionNum} signup={signup} updateSignup={updateSignup} />
      </Row>
    </Container>
  )
}

export default CCSignUp;


