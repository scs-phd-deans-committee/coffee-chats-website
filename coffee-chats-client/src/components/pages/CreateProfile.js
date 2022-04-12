import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { auth, firestore } from "../../firebaseClient";
import { firebase } from '@firebase/app';
import "firebase/auth";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Modal, ModalDialog, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import { Link } from "react-router-dom";

function CreateProfile(props) {

  return (
    <Container>
      <Row>
        <Col>
          Create Profile Question Template
          {/* Include ProgressBar */}
          {/* Include QuestionArea */}
          {/* Include QuestionNav */}
        </Col>
      </Row>
    </Container>
  )
}

export default CreateProfile;
