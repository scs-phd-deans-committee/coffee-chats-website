import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Login from '../modules/Login';

import {
  Redirect,
  useHistory
} from "react-router-dom";

function Profile(props) {
  const history = useHistory();
  
  if (props.user) {
    return (
      <>
      <br/><br/>
      <Container>
        <Row>
          <Col>
            <div className="text-center">
              <div>Name: {props.user.name} ({props.user.pronoun})</div>
              <div>Department: {props.user.department}, year {props.user.year}</div>
              <div><i>"{props.user.motto}"</i></div>
            </div>
          </Col>
        </Row>
      </Container>
      </>
    )
  } else {
    return (
      <>
        <br/><br/>
        <Container>
          <Login user={props.user} setUser={props.setUser}/>
        </Container>
      </>
    )
  }
}

export default Profile;
