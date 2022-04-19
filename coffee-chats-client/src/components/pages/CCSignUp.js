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
      <><div className="question-text">Where would you want to meet your match?</div><ToggleButtonGroup id="remote" type="radio" name="remote" defaultValue={1}>
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
      <Button className="question-nav" variant="custom" active onClick={() => setQuestion(questionNum + 1)}>Next</Button></>
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
                return (<p>Activity Question Placeholder!</p>)
              case 'expectation':
                return null
              case 'frequency':
                return null
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


