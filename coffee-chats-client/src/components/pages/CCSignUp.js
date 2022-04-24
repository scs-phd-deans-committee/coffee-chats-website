import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { auth, firestore } from "../../firebaseClient";
import { firebase } from '@firebase/app';
import "firebase/auth";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Form, Modal, ModalDialog, ModalHeader, ModalTitle, ModalBody, ModalFooter, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link } from "react-router-dom";

import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import "./styles.css"

function CCSignUp(props) {
  const questions = ['remote', 'activity', 'expectation', 'frequency'];
  const [questionNum, setQuestion] = useState(0);
    

  /* STEP PROGRESS BAR */
  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    return true;
  }

  function step3Validator() {
    // return a boolean
    return true;
  }
    
  // TODO: need to sync progress bar with the question content
  // TODO: need to figure out how to change color and font
  function ProgressBar(props) {
      return(
      <div className="App">
      <StepProgressBar
        startingStep={0}
        steps={[
          {
            label: "Activities",
            name: "Activities",
            content: <h1>Insert Activities content here</h1>
          },
          {
            label: "Expectations",
            name: "Expectations",
            content: <h1>Insert Expectations content here</h1>
          },
          {
            label: "Availability",
            name: "Availability",
            content: <h1>Insert Availability content here</h1>,
            validator: step2Validator
          },
          {
            label: "Submit!",
            name: "Submit!",
            content: <h1>Insert Submit! content here</h1>
          }
        ]}
      />
    </div>
      )
  }
  /* END OF STEP PROGRESS BAR */

  function handleBtnClick(question, val) {
    let isActive = (val === []) ? false : true;
    if (isActive) {
      document.getElementById(question + "-next").classList.add("active");
    } else {
      document.getElementById(question + "-next").classList.remove("active");
    }
  }

  function RemoteQuestion(props) {
    return (
      <><div className="question-text">Where would you want to meet your match?</div>
      <ToggleButtonGroup className="answerArea" id="remote" type="radio" name="remote" onChange={(val) => handleBtnClick("remote", val)}>
        <ToggleButton id="remote-1" value={1} variant="custom">
          Online
        </ToggleButton>
        <ToggleButton id="remote-2" value={2} variant="custom">
          In Person
        </ToggleButton>
        <ToggleButton id="remote-3" value={3} variant="custom">
          Both
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
      <div className="question-nav">
        <Button id="remote-next" variant="custom-nav" onClick={() => setQuestion(questionNum + 1)}>Next</Button>
      </div></>
    )
  }

  function filterActivities (e) {
    var input = e.target.value.toLowerCase();
    var activities = document.getElementById("activity").children;
    for (var i=0; i<activities.length; i++) {
      var activity = activities[i];
      if (!activity.firstChild.value.toLowerCase().includes(input)) {
        activity.style.display = "none";
      } else if (input === '') {
        activity.style.display = "block";
      }
    }
  }

  function ActivityQuestion(props) {
    // still in progress
    const activities = ["Play sports", "Talk about hobbies", "Play a board game", "Get food or drinks", "Get food or drinks (no alcohol)", "Visit a museum", "Watch a movie", "Tour each other’s academic buildings", "Go on a walk", "Go to a farmer’s market", "Tour Phipps Conservatory", "Get coffee", "Any activities work!"]
    return (
      <><div className="question-text">What activities would you be interested in doing with your match?</div>
      <div className="question-sub-text">Please select around 5 activities!</div>
      <Form.Control className="search" placeholder="Search" onChange={filterActivities}/>
      <ToggleButtonGroup className="answerArea" id="activity" type="checkbox" name="activity" onChange={(val) => handleBtnClick("activity", val)}>
        {activities.map((a) => (
          <ToggleButton value={a} variant="custom">
            {a}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={() => setQuestion(questionNum - 1)}>Back</Button>
        <Button id="activity-next" variant="custom-nav" onClick={() => setQuestion(questionNum + 1)}>Next</Button>
      </div></>
    )
  }

  function ExpectationQuestion(props) {
    // still in progress
    return (
      <><div className="question-text">My expectation(s) for the Coffee Chat program are to ...</div>
      <ToggleButtonGroup className="answerArea" id="expectation" type="checkbox" name="expectation" onChange={(val) => handleBtnClick("expectation", val)}>
        <ToggleButton id="expectation-1" value={1} variant="custom">
          Meet someone new
        </ToggleButton>
        <ToggleButton id="expectation-2" value={2} variant="custom">
          Establish a friendship
        </ToggleButton>
        <ToggleButton id="expectation-3" value={3} variant="custom">
          Break away from work
        </ToggleButton>
        <ToggleButton id="expectation-4" value={4} variant="custom">
          Talk about research
        </ToggleButton>
        <ToggleButton id="expectation-5" value={5} variant="custom">
          Find a hobby partner
        </ToggleButton>
        <ToggleButton id="expectation-6" value={6} variant="custom">
          Other: _
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={() => setQuestion(questionNum - 1)}>Back</Button>
        <Button id="expectation-next" variant="custom-nav" onClick={() => setQuestion(questionNum + 1)}>Next</Button>
      </div></>
    )
  }

  function FrequencyQuestion(props) {
    return (
      <><div className="question-text">How frequent do you want to participate in Coffee Chat meetups?</div>
      <ToggleButtonGroup className="answerArea" id="frequency" type="radio" name="frequency" onChange={(val) => handleBtnClick("frequency", val)}>
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
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={() => setQuestion(questionNum - 1)}>Back</Button>
        <Button  id="frequency-next" variant="custom-nav" onClick={() => setQuestion(questionNum + 1)}>Next</Button>
      </div></>
    )
  }
  
  function QuestionArea(props) {
    return (
        <Row className="question-area flex-column align-items-center">
          {/* can refactor this switch statement and take out question-text and question-nav if we want */}
          {(() => {
            switch (questions[props.questionNum]) {
              case 'remote':
                return <RemoteQuestion/>
              case 'activity':
                return <ActivityQuestion/>
              case 'expectation':
                return <ExpectationQuestion/>
              case 'frequency':
                return <FrequencyQuestion/>
              default:
                return null
            }
          })()}
        </Row>
    );
  }

  return (
    <Container>
      <Row className="flex-column align-items-center">
        <ProgressBar />
        {/* Include QuestionArea, temporarily hard coded*/}
        <QuestionArea questionNum={questionNum}/>
        {/* Include QuestionNav */}
      </Row>
    </Container>
  )
}

export default CCSignUp;


