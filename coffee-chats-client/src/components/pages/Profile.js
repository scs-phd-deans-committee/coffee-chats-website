import React from 'react';
import { useForm, Controller, useController } from "react-hook-form";
import { Container, Row, Col } from 'react-bootstrap';
import Login from '../modules/Login';
import { auth, firestore } from "../../firebaseClient";

import { departmentOptions } from '../pages/Preferences';
import ControlledSelect from '../modules/ControlledSelect';
import '../../public/stylesheets/Forms.css';

import {
  Redirect,
  useHistory
} from "react-router-dom";


// function ControlledSelect({ control, name, props, defaultValue }) {
//   const {
//     field: { ref, ...inputProps },
//     fieldState: {},
//     formState: {}
//   } = useController({
//     name,
//     control,
//     rules: { required: true },
//     defaultValue: defaultValue,
//   });

//   return <Select isMulti={props.isMulti} options={ departmentOptions }
//                         isSearchable={true} isClearable={true} inputRef={ref}/>;
// }

function ProfileEditor(props) {
  const { register, handleSubmit, control } = useForm();

  const updateUser = (data) => {
    props.setUser({...data, uid: props.user.uid});
    let profileRef = firestore.collection("users").doc(props.user.uid);
    let profile = profileRef.update({...data, year: parseInt(props.user.year)})
      .then(profileSnapshot => {
        alert('Profile saved.');
      });
  }
 
  return (
    <>
      <form onSubmit={handleSubmit(updateUser)} className="profileForm">
        <div className="title">Profile Editor</div>
	    <hr/>
        Name <input {...register("name")} defaultValue={props.user.name} />
        <br />
        Pronoun <input {...register("pronoun")} defaultValue={props.user.pronoun}/>
        <br />
        Department 
        <ControlledSelect control={control} name="department" options={departmentOptions} isMulti={false} isClearable={false} defaultValue={props.user.department}/>
        <br />
        Year <input type='number' {...register("year")} defaultValue={props.user.year}/>
        <br />
        Motto <input {...register("motto")} defaultValue={props.user.motto}/>
        <br />
        <input className="submit-button" type="submit" value="Update profile"/>
      </form>
    </>
  )
}

function ProfileDisplay(props) {
  return (
    <div className="profile-display text-center">
      <div><span className="name">{props.user.name}</span>{props.user.pronoun ? <span className="pronouns"> ({props.user.pronoun})</span> : <></>}</div>
      { (props.user.department && props.user.year && props.user.motto) ?
        <>
          <div>{props.user.department}, year {props.user.year}</div>
          <div><i>"{props.user.motto}"</i></div>
        </> :
        <></>
      }
      <br/>
      <button onClick={() => {
           props.setUser(null);
           localStorage.removeItem("user");
           props.history.push("/");
         }}>
        Logout
      </button>
    </div>
  )
}

function Profile(props) {
  const history = useHistory();

  if (props.user) {
    if (props.user !== "Invalid") {
        return (
          <>
            <Container>
              <Row className="align-content-center flex-column">
                  <ProfileDisplay user={props.user} setUser={props.setUser} history={history}/>
              </Row>
              <Row className="align-content-center flex-column">
                <ProfileEditor user={props.user} setUser={props.setUser} history={history}/>
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
                <div>You tried to sign in with an invalid account. Please logout and try again using an @andrew.cmu.edu or @pitt.edu account.</div>
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
  }
  else {
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
