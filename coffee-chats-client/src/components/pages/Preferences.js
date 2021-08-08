import React, { Component, useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import ControlledSelect from '../modules/ControlledSelect';
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import { auth, firestore } from "../../firebaseClient";
import { firebase } from '@firebase/app';

import {collegeOptions, departmentOptions, yearOptions, timeOptions, minorityOptions, academicTalkOptions, 
    hobbyOptions, groupOptions, yearPrefOptions, yesNoOptions, collegeToDeps} from "../pages/Preferences_constants";
// import * from "../pages/Preferences_constants";

import "./styles.css";


function TwoColumn(firstCol, secondCol) {
  return (
		<div className="twoCol-container-flex">
			<div className="twoCol-left-flex">
				{firstCol}
			</div>
			<div className="twoCol-right-flex">
				{secondCol}
			</div>
		</div>
		// <div className="twoCol_container">
  )
}

function FancySelect(props) {
	return (
			<div className="fancy-select">
			  <div>{props.label}</div>
			  <ControlledSelect control={props.control} name={props.name} options={props.options} isMulti={props.isMulti} defaultValue={props.defaultValue} />
			</div>
	);
}

function FreeText(props) {
	return (
		<div className="free-text">
			<div>{props.label}</div>
		  <Controller
		  	control={props.control}
		  	name={props.name}
		  	render={({ field: { onChange, onBlur, value, ref} }) => (
                  <Form.Control name={props.name} type="text" 
				//   value={props.value}
					onChange={onChange}
					//   onChange={e => {console.log(e.target.value);
					// 	 onChange(e);}}
		  			defaultValue={props.defaultValue}
		  		/>
		  	)}
		  />
	  </div>
	)
}

function SubmitOrSavedButton(props) {
	if (props.isDirty) {
		return <input className="submit-button" type="submit" value="Submit!"/>;
	} else {
		return <input className="submit-button" type="submit" value="Saved!" disabled={true}/>;
	}
}

function Preferences(props) {

	const { register, handleSubmit, control, reset, formState: {isDirty, isSubmitSuccessful}  } = useForm();
	const [initialData, setInitialData] = useState();

	// const initialData = getLastReponses(props);
	if (!initialData && props.user) {
		// const admin = require("./firebaseAdmin");
		let responsesRef = firestore.collection("responses").where("uid", "==", props.user.uid)
			.orderBy('response_time').limitToLast(1);
		responsesRef.get().then(snapshot => {
				let data = snapshot.docs.map(doc => doc.data())[0]; // Access the only element in this 1-element array
				console.log(data);
				setInitialData(data);
			}
		)
	}

	const updatePreferences = (data) => {
		console.log('form submitted!')
		data = {...data, uid: props.user.uid, response_time: firebase.firestore.FieldValue.serverTimestamp()}
		Object.keys(data).forEach(function(key) {
			if(data[key] === null | data[key] === undefined) {
				data[key] = '';
			}
		})

        console.log(data)
        // console.log(props)

		firestore.collection('responses').add({
			uid: props.user.uid,
			...data
		});
		// setInitialData(data); // Set to null so it reloads
		reset(data);
	}

	if (!props.user || !initialData) {
		return (<div className="title">Preferences Form</div>);
	}
	
	// https://react-hook-form.com/api/useform/formstate
	// const { isDirty, isValid } = formState;
	// console.log(formState.isDirty)
	return (
		<Container>
			<Row className="flex-column align-items-center">
			  <Form onSubmit={handleSubmit(updatePreferences)}>
			    <div className="title">Preferences Form</div>
			  	<hr/>
			    <FreeText name="name" control={control} defaultValue={props.user ? props.user.name : ""} label="Name"/>
			  	<FreeText name="pronouns" control={control} defaultValue={props.user.pronouns} label="Pronouns" value={props.pronouns}/>

			  	<FancySelect name="college" control={control} defaultValue="" label="College" options={collegeOptions} isMulti={false}/>
			  	<FancySelect name="department" control={control} defaultValue="" label="Department/Program" options={departmentOptions} isMulti={false}/>
			  	<FancySelect name="year" control={control} defaultValue="" label="Year" options={yearOptions} isMulti={false}/>
			  	<FancySelect name="time" control={control} defaultValue="" label="Time" options={timeOptions} isMulti={true}/>
			  	
			  	<FancySelect name="group_size" control={control} defaultValue="" label="Group size" options={groupOptions} isMulti={true}/>

					<br/>
			  	<div className="subtitle">Who do you want to meet? (optional)</div>
			  	<hr/>
			  	<FancySelect name="year_pref" control={control} defaultValue="" label="Preferences between years" options={yearPrefOptions} isMulti={true}/>

			  	<FancySelect name="college_pref" control={control} defaultValue="" label="Preference for talking to specific colleges" 
			  		options={collegeOptions} isMulti={true}/>
			  	<FancySelect name="department_pref" control={control} defaultValue="" label="Preference for talking to specific departments/programs" 
			  		options={departmentOptions} isMulti={true}/>
			  	
			  	<div>
			  		<FancySelect name="minority_background_pref" control={control} defaultValue="" label="Would you like to meet people with similar minority backgrounds as you?" options={yesNoOptions} isMulti={false}/>
			  		<FancySelect name="minority_background" control={control} defaultValue="" label="Minority background" onChange={props.onChange} options={minorityOptions} isMulti={true}/>
			  	</div>

					<br/>
			  	<div className="subtitle">What would you like to talk about? (optional)</div>
			  	<hr/>
			  	<FancySelect name="academic_talk_pref" control={control} defaultValue="" label="Preference for talking about academic vs. non-academic topics" 
			  		options={academicTalkOptions} isMulti={false}/>
			  	<FreeText name="research_topics" control={control} defaultValue="" label="Research topics" value={props.researchTopics}/>
			  	<FancySelect name="hobbies" control={control} defaultValue="" label="Hobbies" options={hobbyOptions} isMulti={true}/>
			  	<FreeText name="hobbies_freetext" control={control} defaultValue={initialData.hobbiesFreeText} name="hobbiesFreeText" label="Additional hobbies/interests you would like to talk about" />


					<br/>
			  	<div className="subtitle">Submission Details</div>
			  	<hr/>

			  	<FancySelect name="privacy_pref" control={control} defaultValue="" label="Can we include your anonymized data in our public statistics?" options={yesNoOptions} isMulti={false}/>
			  	<FreeText name="other" control={control} defaultValue="" label="Anything else you want us to know for matching purposes?" 
			  		value={props.other}/>

					<br/>
			  	{/* <input className="submit-button" type="submit" value="Submit!"/> */}
				<SubmitOrSavedButton isDirty={isDirty} isSubmitSuccessful={isSubmitSuccessful}/>
			  </Form>
			</Row>
		</Container>
	)
}


export default Preferences;
export { departmentOptions };

