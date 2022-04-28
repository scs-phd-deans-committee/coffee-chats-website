import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { auth, firestore } from "../../firebaseClient";
import { firebase } from '@firebase/app';
import "firebase/auth";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Form, Modal, ModalDialog, ModalHeader, ModalTitle, ModalBody, 
  ModalFooter, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link } from "react-router-dom";

import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import "./styles.css"

function CCSignUp(props) {
  const questions = ['remote', 'activity', 'expectation', 'frequency', 
  'diceroll', 'comments'];
  const [questionNum, setQuestion] = useState(0);
    

  /* STEP PROGRESS BAR */
  // setup step validators, will be called before proceeding to the next step
  function activitiesValidator() {
    // return a boolean
    return true;
  }
    
  function expectationsValidator() {
    // return a boolean
    return true;
  }
    
  function availabilityValidator() {
    return true;
  }

  function submitValidator() {
    // return a boolean
    return true;
  }
    
  // TODO: need to sync progress bar with the question content
  function ProgressBar(props) {
      return(
      <StepProgressBar
        startingStep={0}
        steps={[
          {
            label: "Activities",
            name: "Activities",
            validator: activitiesValidator
          },
          {
            label: "Expectations",
            name: "Expectations",
            content: <h1>Insert Expectations content here</h1>,
            validator: expectationsValidator
          },
          {
            label: "Availability",
            name: "Availability",
            content: <h1>Insert Availability content here</h1>,
            validator: availabilityValidator
          },
          {
            label: "Submit!",
            name: "Submit!",
            content: <h1>Insert Submit! content here</h1>
          }
        ]}
      />
      )
  }
  /* END OF STEP PROGRESS BAR */

  // Checking if the "Next" button can be set to valid
  function handleBtnClick(question, val) {
    let isActive = (val === []) ? false : true;
    if (isActive) {
      document.getElementById(question + "-next").classList.add("active");
    } else {
      document.getElementById(question + "-next").classList.remove("active");
    }
  }

  function RemoteQuestion(props) {
    return (
      <><div className="question-text">Where would you want to meet your match?</div>
      <ToggleButtonGroup className="answerArea" id="remote" type="radio" 
      name="remote" onChange={(val) => handleBtnClick("remote", val)}>
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
      <div className="question-nav">
        <Button id="remote-next" variant="custom-nav" 
        onClick={() => setQuestion(questionNum + 1)}>Next</Button>
      </div></>
    )
  }

  // Filter activities displayed based on search input
  function filterActivities (e) {
    var input = e.target.value.toLowerCase();
    var activities = document.getElementById("activity").children;
    for (var i=0; i<activities.length; i++) {
      var activity = activities[i];
      if (!activity?.firstChild?.value?.toLowerCase().includes(input)) {
        activity.style.display = "none";
      } else if (input === '') {
        activity.style.display = "block";
      }
    }
  }

  // Toggle checkbox icon when button is clicked or unclicked
  function toggleCheckbox (e) {
    var box = document.getElementById(e.target.value).children[1];
    if (box.classList.contains("unchecked")) {
      box.classList.remove("unchecked");
      box.classList.add("checked");
    } else {
      box.classList.remove("checked");
      box.classList.add("unchecked");
    }
  }

  function ActivityQuestion(props) {
    const [addState, setAddState] = useState("init");
    
    const activities = ["Play sports", "Talk about hobbies", "Play a board game", 
    "Get food or drinks", "Get food or drinks (no alcohol)", "Visit a museum", 
    "Watch a movie", "Tour each other’s academic buildings", "Go on a walk", 
    "Go to a farmer’s market", "Tour Phipps Conservatory", "Get coffee", 
    "Any activities work!"]
    
    const [activitiesState, setActivitiesState] = useState(activities);
    
    // adds a new activity based on user's "other" input
    const handleInput = e => {
      if (e.key === 'Enter') {
        const value = document.getElementById("addActivityInput").value;
        setActivitiesState([...activitiesState, value]);
        setAddState("init")
      }
    }
    return (
      <><div className="question-text">
        What activities would you be interested in doing with your match?
        </div>
      <div className="question-sub-text">Please select around 5 activities!</div>
      <Form.Control className="search" placeholder="Search" onChange={filterActivities}/>
      <ToggleButtonGroup className="answerArea" id="activity" type="checkbox" 
      name="activity" onChange={(val) => handleBtnClick("activity", val)}>
        {activitiesState.map((a) => (
          <ToggleButton key={a} id={a} value={a} variant="custom" onChange={toggleCheckbox}>
            <span className="unchecked"></span>
            {a}
          </ToggleButton>
        ))}
        {/* displays initial state of add button, just the plus sign */}
        {addState === "init" &&
          <div className="addOption" id="addActivity" onClick={() => setAddState("input")}>
            <span className="add"></span>
          </div>
        }
        {/* displays input state of add button, including an input field */}
        {addState === "input" &&
          <div className="addOptionText" id="addActivity" onClick={() => setAddState("input")}>
            <span className="add addLeft"></span>
            <input id="addActivityInput" type="text" className="addInput" 
            placeholder="Your own activity!" onKeyUp={handleInput}/>
          </div>
        }
      </ToggleButtonGroup>
      <Button className="skip" variant="link" onClick={() => setQuestion(questionNum + 1)}>
        Skip this question
      </Button>
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={() => setQuestion(questionNum - 1)}>Back</Button>
        <Button id="activity-next" variant="custom-nav" 
        onClick={() => setQuestion(questionNum + 1)}>Next</Button>
      </div></>
    )
  }


  function ExpectationQuestion(props) {
    const [addState, setAddState] = useState("init");
    const expectations = ["Meet someone new", "Establish a friendship", 
    "Break away from work", "Talk about research", "Find a hobby partner"]
    const [expectState, setExpectState] = useState(expectations);
      
    // adds a new activity based on user's "other" input
    const handleInput = e => {
      if (e.key === 'Enter') {
        const value = document.getElementById("addExpectationInput").value;
        setExpectState([...expectState, value]);
        setAddState("init")
      }
    }
    return (
      <><div className="question-text">My expectation(s) for the Coffee Chat program are to . . .</div>
      <ToggleButtonGroup className="answerArea" id="expectation" type="checkbox" 
      name="expectation" onChange={(val) => handleBtnClick("expectation", val)}>
        {expectState.map((e) => (
          <ToggleButton key={e} id={e} value={e} variant="custom" onChange={toggleCheckbox}>
            <span className="unchecked"></span>
            {e}
          </ToggleButton>
        ))}
        {/* displays initial state of add button, just the plus sign */}
        {addState === "init" &&
          <div className="addOption" id="addExpectation" onClick={() => setAddState("input")}>
            <span className="add"></span>
          </div>
        }
        {/* displays input state of add button, including an input field */}
        {addState === "input" &&
          <div className="addOptionText" id="addExpectation" onClick={() => setAddState("input")}>
            <span className="add addLeft"></span>
            <input id="addExpectationInput" type="text" className="addInput" 
            placeholder="Your own expectation!" onKeyUp={handleInput}/>
          </div>
        }
      </ToggleButtonGroup>
      <Button className="skip" variant="link" onClick={() => setQuestion(questionNum + 1)}>
        Skip this question
      </Button>
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={() => setQuestion(questionNum - 1)}>Back</Button>
        <Button id="expectation-next" variant="custom-nav" 
        onClick={() => setQuestion(questionNum + 1)}>Next</Button>
      </div></>
    )
  }

  function FrequencyQuestion(props) {
    return (
      <><div className="question-text">
        How frequent do you want to participate in Coffee Chat meetups?
      </div>
      <ToggleButtonGroup className="answerArea" id="frequency" type="radio" 
      name="frequency" onChange={(val) => handleBtnClick("frequency", val)}>
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
      <div className="question-nav">
        <Button variant="custom-nav" onClick={() => setQuestion(questionNum - 1)}>
          Back
        </Button>
        <Button  id="frequency-next" variant="custom-nav" onClick={() => setQuestion(questionNum + 1)}>
          Next
        </Button>
      </div></>
    )
  }

  function DiceRollQuestion(props) {
    const [diceState, setDiceState] = useState(0);
    const rollDice = () => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setDiceState(roll);
    }
    return (
      <>
      {/* dice state is initially zero, when the user has not rolled. 
      the UI is replaced when the user rolls the dice */}
      { (diceState === 0) ?
        <><div className="question-text">
          The person who rolls the lowest number will initiate contact
          </div>
        {/* TODO: add dice animation */}
        <Button id="roll-dice" variant="custom-nav" onClick={rollDice}>Try your luck!</Button></>
        :
        <><div className="question-text">You rolled a </div>
        <div id="dice-result">{diceState}</div>
        <div className="question-text">You’ll have to wait and see what your match gets!</div></>
      }
      <><br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={() => setQuestion(questionNum - 1)}>Back</Button>
        <Button id="frequency-next" variant="custom-nav" onClick={() => setQuestion(questionNum + 1)}>
          Next
        </Button>
      </div></></>
    )
  }

  function CommentsQuestion(props) {
    return (
      <><div className="question-text">
        That’s it, you’re ready to submit! Do you have any final comments for us to consider?
        </div>
      <Form.Control id="comments-box" as="textarea" rows={7} placeholder="Additional thoughts" />
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={() => setQuestion(questionNum - 1)}>Back</Button>
        <Button  id="submit" variant="custom-nav" onClick={() => setQuestion(questionNum + 1)}>
          Submit
        </Button>
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
                return <RemoteQuestion/>
              case 'activity':
                return <ActivityQuestion/>
              case 'expectation':
                return <ExpectationQuestion/>
              case 'frequency':
                return <FrequencyQuestion/>
              case 'diceroll':
                return <DiceRollQuestion/>
              case 'comments':
                return <CommentsQuestion/>
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
        <ProgressBar/>
        {/* Include QuestionArea, temporarily hard coded*/}
        <QuestionArea questionNum={questionNum}/>
        {/* Include QuestionNav */}
      </Row>
    </Container>
  )
}

export default CCSignUp;


