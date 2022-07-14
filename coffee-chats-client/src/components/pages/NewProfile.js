import React, { useEffect, useState } from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';
import StepProgressBar from "react-step-progress";

import Select from 'react-select';
import {collegeOptions, departmentOptions, roleOptions} from "../pages/Preferences_constants";



/**
 * CustomClass for searchable select dropdown
 * @param {string} label string
 * @param {Dict} options list of {value: "VAL", label: "LABEL"}'s
 * @param {boolean} isMulti boolean=true is can select multiple options
 * @param {Array} defaultValue array of selected options 
 * @returns function component
 */
function FancySelect2(props) {
    let {handleChange, options, isMulti, defaultValue} = props;
    const customStyles =  {
        dropdownIndicator: (base) => ({
          ...base,
          width: "50px"
        }),
        clearIndicator: (base) => ({
          ...base,
          width: "50px"
        }),
        indicatorsContainer: (base) => ({
          ...base,
          maxWidth: "100px"
        }),
        singleValue: (base) => ({
          ...base,
          paddingLeft: "5px"
        }),
        valueContainer: (base) => ({
          ...base,
          paddingLeft: "0px"
        }),
    }

    function getValueSelect(raw_data, isMulti) {
        if (raw_data === null) {
            return "";
        }
        else if (isMulti) {
            return raw_data.map((an_option) => (an_option.value));
        } else {
            return raw_data.value;
        }
    }

	return (
        // <div className="fancy-select" style={{width: '300px'}}>
        <div style={{width: '700px'}}>
            <Select isMulti={isMulti} isClearable={true} options={options}
            isSearchable={true}
            onChange={(value) => {handleChange(getValueSelect(value, isMulti))}}
            defaultValue={defaultValue}
            styles={customStyles}
            />
        </div>
	);
}

/**
 * Profile Progress Bar that goes through sections
 * @param {int} curSection 
 */
function ProfileProgressBar(props) {
    let {curSection} = props;
    return (
        <StepProgressBar
        startingStep={curSection}
        steps={[
            {
            label: "Main",
            name: "Main"
            },
            {
            label: "Submit",
            name: "Submit"
            }
        ]}
        />
    );
}

/**
 * Core profile questions: Name, pronoun, college, department, year
 * @param {function} handleState 
 */
function ProfileCore(props) {
    let {handleState, clickToNextSection, validateData} = props;

    function getSubmitButton() {
        if (validateData()) {
            return (
                <div className="question-nav">
                    <Button id="remote-next" variant="custom-nav" 
                    disabled={false}
                    active={true}
                    onClick={clickToNextSection}>Next</Button>
                </div>
            );
        } else {
            return (
                <div className="question-nav">
                    <Button id="remote-next" variant="custom-nav" 
                    disabled={true}
                    active={false}
                    onClick={clickToNextSection}>Next</Button>
            </div>
            );
        }
    }

    return (
        <> 
        <div className="question-text">Name</div>
        <input id="name-text" type="text" className="addInput" 
              placeholder="Name" onKeyUp={e => handleState("name", e.target.value)}/>

        <div className="question-text">Pronouns</div>
        <input id="pronoun-text" type="text" className="addInput" 
              placeholder="E.g. she/her" onKeyUp={e => handleState("pronoun", e.target.value)}/>

        <div className="question-text">College</div>
        <FancySelect2 options={collegeOptions} isMulti={false} defaultValue={null}
                handleChange={val => handleState("college", val)}/>

        <div className="question-text">Department/Program</div>
        <FancySelect2 options={departmentOptions} isMulti={true} defaultValue={null}
                handleChange={val => handleState("department", val)}/>

        <div className="question-text">Role</div>
        <FancySelect2 options={roleOptions} isMulti={false} defaultValue={null}
                handleChange={val => handleState("role", val)}/>
        
        <div className="question-text">Start Year</div>
        <input id="start-year-text" type="text" className="addInput" 
              placeholder="E.g. 2021" onKeyUp={e => handleState("startYear", e.target.value)}/>

        {getSubmitButton()}
        </>
    );
}


/**
 * Use this to get specific handle changes for different functions
 * @param {function} setStateFunc which should be a setState dictionary function
 */
function getSpecificHandleChange(setStateFunc) {
    function handleChange(key, value) {
        console.log(key, value)
        setStateFunc(prevState => ({
            ...prevState,
            [key]: value
        }));
    }
    return handleChange;
}

function NewProfile(props) {
    const [sectionNum, setSectionNum] = useState(0);
    const [profileState, setProfileState] = useState({name: "", pronoun: "", 
                            college: "", department: "", role: "", startYear: ""});
    function validateProfileData() {
        return false
    }
    const handleProfileState = getSpecificHandleChange(setProfileState);

    return (
    <Container fluid>
        <Row className="flex-column align-items-center">
        <ProfileProgressBar curSection={sectionNum}/>
        <Row className="question-area flex-column align-items-center"> {/* This is the main question area */}
            <ProfileCore handleState={handleProfileState} clickToNextSection={clickToNextSection} 
                validateData={validateData}  />
        </Row>
        {/* <QuestionArea questionNum={questionNum} handleInput={handleInput} /> */}
        {/* name: {profileState.name} \n
        pronoun: {profileState.pronoun} \n
        college: {profileState.college} \n */}
        {Object.entries(profileState).map(([key, value]) => <div>{key}: {value}</div>)}
        </Row>
    </Container>
    )
}

export default NewProfile;