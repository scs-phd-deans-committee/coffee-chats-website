import React from 'react';
import { useForm } from "react-hook-form";
import { Container, Row, Col } from 'react-bootstrap';
import Login from '../modules/Login';
import { auth, firestore } from "../../firebaseClient";

import {
  Redirect,
  useHistory
} from "react-router-dom";

function Profile(props) {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const updateUser = (data) => {
    props.setUser({...data, uid: props.user.uid});
    let profileRef = firestore.collection("users").doc(props.user.uid);
    let profile = profileRef.update({...data, year: parseInt(props.user.year)})
      .then(profileSnapshot => {
        alert('Profile saved.');
      });
  }

  if (props.user) {
    if (props.user !== "Invalid") {
      return (
        <>
        <Container>
          <Row>
            <Col>
              <form onSubmit={handleSubmit(updateUser)}>
                Name: <input {...register("name")} defaultValue={props.user.name} /> 
                <br />
                Pronoun: <input {...register("pronoun")} defaultValue={props.user.pronoun}/> 
                <br />
                Department: <input {...register("department")} defaultValue={props.user.department}/>
                <br />
                Year: <input type='number' {...register("year")} defaultValue={props.user.year}/>
                <br />
                Motto: <input {...register("motto")} defaultValue={props.user.motto}/>
                <br />
                <input type="submit" />
              </form>

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
