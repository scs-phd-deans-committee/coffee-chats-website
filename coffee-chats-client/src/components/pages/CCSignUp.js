import React, { useEffect, useState } from 'react';

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

import ScheduleSelector from "react-schedule-selector";

function CCSignUp(props) {
  const questions = ['remote', 'activity', 'expectation', 'frequency', 'availability',
  'diceroll', 'comments', 'review', 'submit'];
  const [questionNum, setQuestion] = useState(0);
    

  /* STEP PROGRESS BAR */ 

  /* sync progress bar with question content */
  const [curSection, setCurSection] = useState(0);
    
  
  // TODO: need to sync progress bar with the question content
  function ProgressBar(props) {
          
      return(
      <StepProgressBar
        startingStep={curSection}
        steps={[
           {
            label: "Activities",
            name: "Activities",
          },
           {
            label: "Expectations",
            name: "Expectations",
          },
           {
            label: "Availability",
            name: "Availability",
          },
          {
            label: "Comments",
            name: "Comments",
            
          },
          {
            label: "Submit!",
            name: "Submit!",
            
          }
        ]}
      />
      )
  }

  
  /* END OF STEP PROGRESS BAR */

  function RemoteQuestion(props) {

    function clickToNextSection() {
          setQuestion(questionNum + 1); 
          setCurSection(0);
          }

    // Checking if the "Next" button can be set to valid
    function handleBtnClick(val) {
      let isActive = (val === []) ? false : true;
      var next = document.getElementById("remote-next");
      if (isActive) {
        next.classList.add("active");
        next.disabled = false;
        next.onclick = clickToNextSection;
      } else {
        next.classList.remove("active");
        next.disabled = true;
      }
    }
    return (
      <><div className="question-text">Where would you want to meet your match?</div>
      <ToggleButtonGroup className="answerArea" id="remote" type="radio" 
      name="remote" onChange={handleBtnClick}>
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
        <Button id="remote-next" variant="custom-nav" disabled
        onClick={clickToNextSection}>Next</Button>
      </div></>
    )
  }

  // Filter activities displayed based on search input
  function filterActivities (e) {
    var input = e.target.value.toLowerCase();
    var activities = document.getElementById("activity").children;
    console.log(activities);
    for (var i=0; i<activities.length; i++) {
      var activity = activities[i];
      if (input === '') {
        activity.style.display = "block";
      } else if (!activity?.firstChild?.value?.toLowerCase().includes(input)) {
        activity.style.display = "none";
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
    
    // update progress bar if next
    function clickToNextSection() {
          setQuestion(questionNum + 1); 
          setCurSection(1);
          }
    function clickToPrevSection() {
        setQuestion(questionNum - 1);
        setCurSection(0);
        }
    // Checking if the "Next" button can be set to valid
    function handleBtnClick(val) {
      var next = document.getElementById("activity-next");
      if (val.length && (val[0] !== undefined)) {
        next.classList.add("active");
        next.disabled = false;
        next.onclick = clickToNextSection;
      } else {
        next.classList.remove("active");
        next.disabled = true;
      }
    }
    return (
      <><div className="question-text">
        What activities would you be interested in doing with your match?
        </div>
      <div className="question-sub-text">Please select around 5 activities!</div>
      <Form.Control className="search" placeholder="Search" onChange={filterActivities}/>
      <ToggleButtonGroup className="answerArea" id="activity" type="checkbox" 
      name="activity" onChange={handleBtnClick}>
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
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={() => setQuestion(questionNum - 1)}>Back</Button>
        <Button id="activity-next" variant="custom-nav" disabled
        onClick={clickToNextSection}>Next</Button>
      </div></>
    )
  }


  function ExpectationQuestion(props) {
    const expectations = ["Meet someone new", "Establish a friendship", 
    "Break away from work", "Talk about research", "Find a hobby partner"]
    const [expectState, setExpectState] = useState(expectations);
          
    // for progress bar if previous
    function clickToNextSection() {
          setQuestion(questionNum + 1);
          setCurSection(1);
          }
          
    function clickToPrevSection() {
          setQuestion(questionNum - 1);
          setCurSection(0);
          }
    // Checking if the "Next" button can be set to valid
    function handleBtnClick(val) {
      var next = document.getElementById("expectation-next");
      if (val.length) {
        next.classList.add("active");
        next.disabled = false;
        next.onclick = clickToNextSection;
      } else {
        next.classList.remove("active");
        next.disabled = true;
      }
    }
    return (
      <><div className="question-text">My expectation(s) for the Coffee Chat program are to . . .</div>
      <div className="question-sub-text">Your answer(s) will be shared with your match!</div>
      <ToggleButtonGroup className="answerArea" id="expectation" type="checkbox" 
      name="expectation" onChange={handleBtnClick}>
        {expectState.map((e) => (
          <ToggleButton key={e} id={e} value={e} variant="custom" onChange={toggleCheckbox}>
            <span className="unchecked"></span>
            {e}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={clickToPrevSection}>Back</Button>
        <Button id="expectation-next" variant="custom-nav" disabled
        onClick={clickToNextSection}>Next</Button>
      </div></>
    )
  }

  function FrequencyQuestion(props) {
          
    function clickToNextSection() {
          setQuestion(questionNum + 1); 
          setCurSection(2);   
          };
          
    function clickToPrevSection() {
          setQuestion(questionNum - 1);
          setCurSection(1);
          };
    return (
      <><div className="question-text">
        How frequent do you want to participate in Coffee Chat meetups?
      </div>
      <ToggleButtonGroup className="answerArea" id="frequency" type="radio" 
      name="frequency">
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
      <Button className="skip" variant="link" onClick={clickToNextSection}>
        Skip this question
      </Button>
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={clickToPrevSection}>
          Back
        </Button>
        <Button  id="frequency-next" className="active" variant="custom-nav" 
        onClick={clickToNextSection}>
          Next
        </Button>
      </div></>
    )
  }
          
  function AvailabilityQuestion(props) {
    const [schedule, setSchedule] = useState([]);
          
    useEffect(() => {
        document.addEventListener("touchstart", {});
        return () => {
            document.addEventListener("touchstart", {});
        }
    }, []);

    function clickToNextSection() {
      setQuestion(questionNum + 1); 
      setCurSection(2);   
      };
      
    function clickToPrevSection() {
          setQuestion(questionNum - 1);
          setCurSection(1);
          };

    const handleChange = (newSchedule) => {
      setSchedule(newSchedule);
      // TODO: add next disabling once we investigate handleChange
      
      // var next = document.getElementById("availability-next");
      // if (schedule.length) {
      //   next.classList.add("active");
      //   next.disabled = false;
      //   next.onclick = clickToNextSection;
      // } else {
      //   next.classList.remove("active");
      //   next.disabled = true;
      // }
    };
    return (
      <><div className="question-text">
        What does your availability look like next week?
        </div>
      <ScheduleSelector
          selection={schedule}
          numDays={5}
          minTime={8}
          maxTime={22}
          hourlyChunks={1}
          onChange={handleChange}
        />
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={clickToPrevSection}>Back</Button>
        <Button  id="availability-next" variant="custom-nav" onClick={clickToNextSection}>
          Next
        </Button>
      </div></>
    )
          }

  function DiceRollQuestion(props) {
    const [diceState, setDiceState] = useState(0); 
    function clickToNextSection() {
          setQuestion(questionNum + 1); 
          setCurSection(3);   
          };
          
    function clickToPrevSection() {
          setQuestion(questionNum - 1);
          setCurSection(2);
          };
    const rollDice = () => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setDiceState(roll);

      var next = document.getElementById("dice-next");
      next.classList.add("active");
      next.disabled = false;
      next.onclick = clickToNextSection;
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
        <Button variant="custom-nav" onClick={clickToPrevSection}>Back</Button>
        <Button id="dice-next" variant="custom-nav" disabled onClick={clickToNextSection}>
          Next
        </Button>
      </div></></>
    )
  }

  function CommentsQuestion(props) {
    function clickToNextSection() {
          setQuestion(questionNum + 1); 
          setCurSection(4);   
          };
          
    function clickToPrevSection() {
          setQuestion(questionNum - 1);
          setCurSection(2);
          };
    return (
      <><div className="question-text">
        That’s it, you’re ready to submit! Do you have any final comments for us to consider?
        </div>
      <Form.Control id="comments-box" as="textarea" rows={7} placeholder="Additional thoughts" />
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={clickToPrevSection}>Back</Button>
        <Button id="comments-next" variant="custom-nav" onClick={clickToNextSection}>
          Next
        </Button>
      </div></>
    )
  }

  function ReviewQuestion(props) {
    function clickToNextSection() {
          setQuestion(questionNum + 1); 
          setCurSection(4);   
          };
          
    function clickToPrevSection() {
          setQuestion(questionNum - 1);
          setCurSection(3);
          };
    return (
      <><div className="question-text">Thanks Scotty!</div>
      <div className="question-sub-text">
        Check through your preferences one last time before you submit!
      </div>
      <div className="review-section twoCol-container-flex">
        <div className="review-heading twoCol-left-flex">Activity:</div>
        <div className="review-text twoCol-right-flex">
          You prefer meeting <b>in person</b>, and would want to: <b>play sports, play a board game, or visit a museum.</b>
        </div>
      </div>
      <div className="review-section twoCol-container-flex">
        <div className="review-heading twoCol-left-flex">Expectations:</div>
        <div className="review-text twoCol-right-flex">
          You hope to <b>meet someone new</b> and <b>break away from work</b>. You also plan to participate in the Coffee Chats program <b>biweekly</b>.
        </div>
      </div>
      <div className="review-section twoCol-container-flex">
        <div className="review-heading twoCol-left-flex"></div>
        <div className="review-text twoCol-right-flex">You also prioritize the following factors:
        </div>
      </div>
      {/* include matching priorities */}
      <div className="review-section twoCol-container-flex">
        <div className="review-heading twoCol-left-flex">Scheduling:</div>
        <div className="review-text twoCol-right-flex">
          <ScheduleSelector className="review-schedule"
            selection={[]}
            numDays={5}
            minTime={8}
            maxTime={22}
            hourlyChunks={1}
          />
        </div>
      </div>
      <div className="review-section twoCol-container-flex">
        <div className="review-heading twoCol-left-flex">Comments</div>
        <div className="review-text twoCol-right-flex">And lastly, you had no final comments to add!
        </div>
      </div>
      <div className="question-text">Does that sound right?</div>
      <br />
      <div className="question-nav">
        <Button id="submit-back" variant="custom-nav" onClick={clickToPrevSection}>No, let's go back</Button>
        <Button id="submit" variant="custom-nav" onClick={clickToNextSection}>
          Yes, let's submit!
        </Button>
      </div></>
    )
  }

  function SubmissionScreen(props) {
    return (
      <><div className="submitted-text">
        Congratulations on submitting!
        </div>
      <Button id="back-home" variant="custom-nav">Back to home</Button></>
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
              case 'availability':
                return <AvailabilityQuestion/>    
              case 'diceroll':
                return <DiceRollQuestion/>
              case 'comments':
                return <CommentsQuestion/>
              case 'review':
                return <ReviewQuestion/>
              case 'submit':
                return <SubmissionScreen/>
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


