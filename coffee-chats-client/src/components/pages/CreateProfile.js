import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { auth, firestore } from "../../firebaseClient";
import { firebase } from '@firebase/app';
import "firebase/auth";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Modal, ModalDialog, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import { Link } from "react-router-dom";

function QuestionArea(props) {
	return (
			<div className="question-area">
			  <div className="question-text">{props.questionText}</div>
			</div>
	);
}

function CreateProfile(props) {

  return (
    <Container>
      <Row className="flex-column align-items-center">
        {/* Include ProgressBar */}
        {/* Include QuestionArea, temporarily hard coded*/}
        <QuestionArea name="college" questionText="Confirm your basic info"/>
        {/* Include QuestionNav */}
      </Row>
    </Container>
  )
}

export default CreateProfile;
