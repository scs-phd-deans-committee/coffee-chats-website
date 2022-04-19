import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { auth, firestore } from "../../firebaseClient";
import { firebase } from '@firebase/app';
import "firebase/auth";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Modal, ModalDialog, ModalHeader, ModalTitle, ModalBody, ModalFooter, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link } from "react-router-dom";

function CCSignUp(props) {
  const questions = ['remote', 'activity', 'expectation', 'frequency'];
  const [questionNum, setQuestion] = useState(0);

  function RemoteQuestion(props) {
    return (
      <><div className="question-text">Where would you want to meet your match?</div>
      <ToggleButtonGroup className="answerArea" id="remote" type="radio" name="remote" defaultValue={1}>
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
      <div class="question-nav">
        <Button variant="custom" active onClick={() => setQuestion(questionNum + 1)}>Next</Button>
      </div></>
    )
  }

  function ActivityQuestion(props) {
    // still in progress
    return (
      <><div className="question-text">What activities would you be interested in doing with your match?</div>
      <div className="question-sub-text">Please select around 5 activities!</div>
      <ToggleButtonGroup className="answerArea" id="activity" type="checkbox" name="activity">
        <ToggleButton id="activity-1" value={1} variant="custom">
          Play Sports
        </ToggleButton>
        <ToggleButton id="activity-2" value={2} variant="custom">
          Talk about hobbies
        </ToggleButton>
        <ToggleButton id="activity-3" value={3} variant="custom">
          Play a board game
        </ToggleButton>
        <ToggleButton id="activity-4" value={4} variant="custom">
          Get food or drinks
        </ToggleButton>
        <ToggleButton id="activity-5" value={5} variant="custom">
          Get food or drinks (no alcohol)
        </ToggleButton>
        <ToggleButton id="activity-6" value={6} variant="custom">
          Visit a museum
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
      <div class="question-nav">
        <Button variant="custom-nav" onClick={() => setQuestion(questionNum - 1)}>Back</Button>
        <Button variant="custom-nav" active onClick={() => setQuestion(questionNum + 1)}>Next</Button>
      </div></>
    )
  }

  function ExpectationQuestion(props) {
    // still in progress
    return (
      <><div className="question-text">My expectation(s) for the Coffee Chat program are to ...</div>
      <ToggleButtonGroup className="answerArea" id="expectation" type="checkbox" name="expectation">
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
      <div class="question-nav">
        <Button variant="custom-nav" onClick={() => setQuestion(questionNum - 1)}>Back</Button>
        <Button variant="custom-nav" active onClick={() => setQuestion(questionNum + 1)}>Next</Button>
      </div></>
    )
  }

  function FrequencyQuestion(props) {
    return (
      <><div className="question-text">How frequent do you want to participate in Coffee Chat meetups?</div>
      <ToggleButtonGroup className="answerArea" id="frequency" type="radio" name="frequency">
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
      <div class="question-nav">
        <Button variant="custom-nav" onClick={() => setQuestion(questionNum - 1)}>Back</Button>
        <Button variant="custom-nav" active onClick={() => setQuestion(questionNum + 1)}>Next</Button>
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
                return <RemoteQuestion />
              case 'activity':
                return <ActivityQuestion />
              case 'expectation':
                return <ExpectationQuestion />
              case 'frequency':
                return <FrequencyQuestion />
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
        {/* Include ProgressBar */}
        {/* Include QuestionArea, temporarily hard coded*/}
        <QuestionArea questionNum={questionNum}/>
        {/* Include QuestionNav */}
      </Row>
    </Container>
  )
}

export default CCSignUp;


