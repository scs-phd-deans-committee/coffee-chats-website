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
    if (props.user !== "Invalid") {
      return (
        <>
        <Container>
          <Row>
            <Col>
              <div className="text-center">
                <div>Name: {props.user.name} {props.user.pronoun ? <span>({props.user.pronoun})</span> : <></>}</div>
                { (props.user.department && props.user.year && props.user.motto) ?
                  <>
                    <div>Department: {props.user.department}, year {props.user.year}</div>
                    <div><i>"{props.user.motto}"</i></div>
                  </> :
                  <></>
                }
                <button onClick={() => {
                     props.setUser(null);
                     localStorage.removeItem("user");
                     history.push("/");
                   }}>
                  Logout
                </button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* TODO: put in ProfileEditor here, e.g.
              * <ProfileEditor user={props.user} setUser={props.setUser}/>
              */}
            </Col>
          </Row>
        </Container>
        </>
      )
    }
    else {
      return (
        <>
        <Container>
          <Row>
            <Col>
              <div className="text-center">
                <div>You tried to sign out with an invalid account. Please logout and try again using an @andrew.cmu.edu or @pitt.edu account.</div>
                <button onClick={() => {
                     props.setUser(null);
                     localStorage.removeItem("user");
                     history.push("/");
                   }}>
                  Logout
                </button>
              </div>
            </Col>
          </Row>
          <Row>
          </Row>
        </Container>
        </>
      )
    }
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
