import React, { useEffect, useState } from 'react';

import { Container, Row, Col, Image } from 'react-bootstrap';

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

import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";
import academic_img from '../../academic.png';
import college_img from '../../college.png';
import hobbies_img from '../../hobbies.png';
import year_img from '../../year.png';
import background_img from '../../background.png';
import diffpriority_img from '../../diffpriority.png';
import samepriority_img from '../../samepriority.png';

function CCSignUp(props) {
  const questions = ['remote', 'activity', 'expectation', 'frequency', 'priorities', 'prioritiesBubbles', 'availability',
  'diceroll', 'comments', 'review', 'submit'];
  const [questionNum, setQuestion] = useState(0);
  
    

  /* STEP PROGRESS BAR */ 

  /* sync progress bar with question content */
  const [curSection, setCurSection] = useState(0);
    
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
    var allActivities = document.querySelectorAll("#indoor-activity, #outdoor-activity, #own-activity");
    console.log(allActivities);
    for (var j=0; j<allActivities.length; j++) {
        var activities = allActivities[j].children;
        for (var i=0; i<activities.length; i++) {
            var activity = activities[i];
            if (input === '') {
                activity.style.display = "block";
            } else if (!activity?.firstChild?.value?.toLowerCase().includes(input)) {
                       activity.style.display = "none";
            }
        }
    }
  }

  const [selectedActivities, setSelectedActivities] = useState([]);

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
    
    const indoorActivities = ["Create a DIY art project", "Get food or drinks", "Get food or drinks (no alcohol)", "Go to the gym", "Go to a jazz club/cafe", "Just talk", "Make candles", "Manicure/Pedicure/Spa", "Paint and sip", "Play a board game", "Tour each other's academic buildings", "Watch a CMU Drama production", "Visit a museum", "Watch a movie"];
    
    const outdoorActivities = ["Get coffee", "Go to an art gallery", "Go to a farmer's market", "Go to a music concert", "Go on a walk", "Hammock at Schenley Park", "Hike", "Picnic", "Play sports", "Tour Phipps Conservatory"];
    
    const [ownActivitiesState, setOwnActivitiesState] = useState([]);
    
    // adds a new activity based on user's "other" input
    const handleInput = e => {
      if (e.key === 'Enter') {
        const value = document.getElementById("addActivityInput").value;
        setOwnActivitiesState([...ownActivitiesState, value]);
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
    
      // check if any activities from any category are selected
      const anySelected = document.getElementById("Any activities work!").children[1].classList.contains("checked");
      
      const indoorActs = document.getElementById("indoor-activity").childNodes;
      const indoorSelected = [...indoorActs].filter((act) => act.children[1].classList.contains("checked")).length > 0;
                       
      const outdoorActs = document.getElementById("outdoor-activity").childNodes;
      const outdoorSelected = [...outdoorActs].filter((act) => act.children[1].classList.contains("checked")).length > 0;

      const ownActs = document.getElementById("own-activity").childNodes;
      const ownSelected = ownActs[0].getAttribute("id") === "addActivity" ? false : [...ownActs].filter((act) => act.getAttribute("id") !== "addActivity" && act.children[1].classList.contains("checked")).length > 0;
                       
      if (anySelected || indoorSelected || outdoorSelected || ownSelected) {
        console.log("next is on");
        next.classList.add("active");
        next.disabled = false;
        next.onclick = clickToNextSection;
      } else {
        next.classList.remove("active");
        next.disabled = true;
        console.log("next is off");
      }
    }
    return (
      <><div className="question-text">
        What activities would you be interested in doing with your match?
        </div>
        
      <div className="question-sub-text">Please select around 5 activities!</div>
        <Row className="search-bar-and-any-option">
      <Col sm="7">
        <Form.Control className="search activity-search" placeholder="Search" onChange={filterActivities}/>
      </Col>
      <Col sm="5">
        <ToggleButtonGroup className="answerArea" id="any-activity" type="checkbox" 
      name="activity" onChange={handleBtnClick}>
          <ToggleButton key="Any activities work!" id="Any activities work!" value="Any activities work!" variant="custom" onChange={toggleCheckbox}>
            <span className="unchecked"></span>
                 Any activities work!
          </ToggleButton>
        </ToggleButtonGroup>
      </Col>
      </Row>
                 
      <Col className="activity-category">
      Indoor
      </Col>
      <ToggleButtonGroup className="answerArea" id="indoor-activity" type="checkbox" 
      name="activity" onChange={handleBtnClick}>
        {indoorActivities.map((a) => (
          <ToggleButton key={a} id={a} value={a} variant="custom" onChange={toggleCheckbox}>
            <span className="unchecked"></span>
            {a}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Col className="activity-category">
        Outdoor
      </Col>
      <ToggleButtonGroup className="answerArea" id="outdoor-activity" type="checkbox" 
      name="activity" onChange={handleBtnClick}>
        {outdoorActivities.map((a) => (
          <ToggleButton key={a} id={a} value={a} variant="custom" onChange={toggleCheckbox}>
            <span className="unchecked"></span>
            {a}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Col className="activity-category">
        Add Your Own
      </Col>
      <ToggleButtonGroup className="answerArea" id="own-activity" type="checkbox" 
      name="activity" onChange={handleBtnClick}>
       {ownActivitiesState.map((a) => (
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
          setCurSection(1);   
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

  const factors = ["academic", "college", "hobbies", "year", "background"];
  const factorNames = 
    {"academic": "academic interests", 
    "college": "colleges & departments",
    "hobbies": "hobbies & interests",
    "year": "year at CMU",
    "background": "background",
    };
  const factorImgs = 
    {"academic": academic_img, 
    "college": college_img,
    "hobbies": hobbies_img,
    "year": year_img,
    "background": background_img,
    };
  const options = ["the same as mine", "different than mine", "anything works!"];
  const [factorState, setFactorState] = useState({});

  function PrioritiesQuestion(props) {
          
    function clickToNextSection() {
          setQuestion(questionNum + 1); 
          setCurSection(1);   
          };

    function skipSection() {
          setQuestion(questionNum + 2); 
          setCurSection(2);   
          };
          
    function clickToPrevSection() {
          setQuestion(questionNum - 1);
          setCurSection(1);
          };
    const handleChange = val => {
      const [factor, option] = val.split("-");
      factorState[factor] = parseInt(option);
      setFactorState(factorState);

      var next = document.getElementById("priorities-next");
      if (Object.keys(factorState).length === factors.length) {
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
        What characteristics do you want to prioritize in your match?
      </div>
      <Button className="skip" variant="link" onClick={skipSection}>
        Skip this question
      </Button>
      <div id='factors'>
        <div className="factor-section">
          <div className="factor-question">
            <div className="factor-num">1.</div>
            <div className="factor-text">I care that my match’s <b>academic interests</b> are</div>
          </div>
          <ToggleButtonGroup key="academic" className="factor-options" onChange={handleChange} type="radio" 
          name="academic">
            {options.map((option, idx) => (
              <ToggleButton name={`academic-${idx}`} key={`academic-${idx}`}
              value={`academic-${idx}`} variant="custom">{option}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <div className="factor-section">
          <div className="factor-question">
            <div className="factor-num">2.</div>
            <div className="factor-text">I care that my match’s <b>college</b> is</div>
          </div>
          <ToggleButtonGroup key="college" className="factor-options" onChange={handleChange} type="radio" 
          name="college">
            {options.map((option, idx) => (
              <ToggleButton name={`college-${idx}`} key={`college-${idx}`}
              value={`college-${idx}`} variant="custom">{option}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <div className="factor-section">
          <div className="factor-question">
            <div className="factor-num">3.</div>
            <div className="factor-text">I care that my match’s <b>hobbies</b> are</div>
          </div>
          <ToggleButtonGroup key="hobbies" className="factor-options" onChange={handleChange} type="radio" 
          name="hobbies">
            {options.map((option, idx) => (
              <ToggleButton name={`hobbies-${idx}`} key={`hobbies-${idx}`}
              value={`hobbies-${idx}`} variant="custom">{option}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <div className="factor-section">
          <div className="factor-question">
            <div className="factor-num">4.</div>
            <div className="factor-text">I care that my match’s <b>year at CMU</b> is</div>
          </div>
          <ToggleButtonGroup key="year" className="factor-options" onChange={handleChange} type="radio" 
          name="year">
            {options.map((option, idx) => (
              <ToggleButton name={`year-${idx}`} key={`year-${idx}`}
              value={`year-${idx}`} variant="custom">{option}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <div className="factor-section">
          <div className="factor-question">
            <div className="factor-num">5.</div>
            <div className="factor-text">I care that my match’s <b>background</b> is</div>
          </div>
          <ToggleButtonGroup key="background" className="factor-options" onChange={handleChange} type="radio" 
          name="background">
            {options.map((option, idx) => (
              <ToggleButton name={`background-${idx}`} key={`background-${idx}`}
              value={`background-${idx}`} variant="custom">{option}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      </div>
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={clickToPrevSection}>Back</Button>
        <Button id="priorities-next" variant="custom-nav active" disabled
        onClick={clickToNextSection}>Next</Button>
      </div></>
    )
  }

  // randomly generate 5 bubble positions, stays static through entire flow
  const [margins, setMargins] = useState([]);
  if (margins.length == 0) {
    for (var i=0; i<5; i++) {
      var margin = Math.floor(Math.random() * 100);
      // alternate heights
      if (i % 2 == 0) {
        margin += 100;
      }
      const marginStr = margin.toString() + "px"
      setMargins(margins => [...margins, marginStr]);
    }
  }

  function PrioritiesBubblesQuestion(props) {
    const numSizes = 5;
    const baseSize = 125;
    const interval = 10;
    function clickToNextSection() {
          setQuestion(questionNum + 1); 
          setCurSection(2);   
          };
          
    function clickToPrevSection() {
          setQuestion(questionNum - 1);
          setCurSection(1);
          };
    function handleBubbleClick(e) {
      const id = e.target.id;
      console.log(id);
      var bubble = document.getElementById(id);
      if (bubble === null) {console.log("couldn't find"); return;}
      const sizeStr = bubble.style.width;
      // width not yet set, so it is at the default size of 125px
      var newSize = 0;
      if (sizeStr == "") {
        newSize = baseSize + interval;
      } else {
        const size = parseInt(sizeStr.slice(0, sizeStr.length - 2));
        newSize = (size === baseSize + interval * (numSizes-1)) ? baseSize : (size + interval);
      }
      const newSizeStr = newSize.toString() + "px";
      bubble.style.maxWidth = newSizeStr;
      bubble.style.maxHeight = newSizeStr;
      bubble.style.width = newSizeStr;
      bubble.style.height = newSizeStr;
    }
    function resetSizes() {
      for (var i=0; i<factors.length; i++) {
        const factor = factors[i];
        var bubble = document.getElementById(factor);
        if (bubble === null) {continue;}
        const baseSizeStr = baseSize.toString() + "px";
        bubble.style.maxWidth = baseSizeStr;
        bubble.style.maxHeight = baseSizeStr;
        bubble.style.height = baseSizeStr;
      }
    }

    return (
      <>
      <Col className="priority-images-same">
        <Image src={samepriority_img} fluid/>
      </Col>
      <Col className="priority-images-diff">
        <Image src={diffpriority_img} fluid/>
      </Col>
      <Col styles={{position: "absolute"}}>
      <div className="question-text">
        Your Priorities
      </div>
      <div className="question-sub-text">
       Click on the circle to indicate priority. The larger the circle, the more the priority.
      </div>
      <Button id="resetSizes" variant="custom-nav" onClick={resetSizes}>
          Reset Sizes
        </Button>
      <Row id="bubblesContainer">
        <Col id="sameBubbles">
            The Same As Me
        <Row id="bubblesContainer">
            {
          Object.entries(factorState).filter(([key, value], idx) => value === 0)
          .map(([key, value], idx) => 
          ((value !== 2) && 
          <Col> <div className="bubble" id={key} key={key} onClick={handleBubbleClick} 
          style={{marginTop: margins[idx], backgroundColor: "#A94152"}}>
            <img src={factorImgs[key]} />
            <div className="bubbleText">
              {factorNames[key]}
            </div>
            </div>
          </Col>))
        }
        </Row>
        </Col>
        <Col id="differentBubbles">
            Different From Me
            <Row id="bubblesContainer">
            {
          Object.entries(factorState).filter(([key, value], idx) => value === 1)
          .map(([key, value], idx) => 
          ((value !== 2) && 
          <Col> <div className="bubble" id={key} key={key} onClick={handleBubbleClick} 
          style={{marginTop: margins[idx], backgroundColor: "#3F3D56"}}>
            <img src={factorImgs[key]} />
            <div className="bubbleText">
              {factorNames[key]}
            </div>
          </div>
          </Col>))
        }
        </Row>
        </Col>
      </Row>
   
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={clickToPrevSection}>Back</Button>
        <Button id="priorities-next" variant="custom-nav active"
        onClick={clickToNextSection}>Next</Button>
      </div>
      </Col>
      
      </>
      
    )
  }
          
  function AvailabilityQuestion(props) {
    const [schedule, setSchedule] = useState([]);
    const [customSchedule, setCustomSchedule] = useState({});
          
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
          setQuestion(questionNum - 2);
          setCurSection(1);
          };
      
    const [nextDisabled, setNextDisabled] = useState(true);
     
    const [radioValue, setRadioValue] = useState('1');
      
    const availabilities = [
        { name: 'Available', value: '1'},
        { name: 'Flexible', value: '2'},
    ];

    const handleChange = (newSchedule) => {
      setSchedule(newSchedule);
      var next = document.getElementById("availability-next");
      if (newSchedule.length !== 0) {
        next.classList.add("active");
        setNextDisabled(false);
      } else {
        next.classList.remove("active");
        setNextDisabled(true);
      }

      // update custom schedule with additions
      for (var i=0; i<newSchedule.length; i++) {
        const time = newSchedule[i];
        if (!(time in customSchedule)) {
          customSchedule[time] = radioValue;
          setCustomSchedule(customSchedule);
        }
      }

      // update custom schedule with removals
      for (let k in customSchedule) {
        if (newSchedule.filter((x) => x == k).length == 0) {
          delete customSchedule[k];
          setCustomSchedule(customSchedule);
        }
      }
    };

    const renderCustomDateCell = (time, selected, innerRef) => (
      <div ref={innerRef}>
        {!selected && <div className="calendarCell" style={{backgroundColor: '#dbedff'}}></div>}
        {selected && customSchedule[time] == '1' && <div className="calendarCell" style={{backgroundColor: '#28a745'}}></div>}
        {selected && customSchedule[time] == '2' && <div className="calendarCell" style={{backgroundColor: '#ffc107'}}></div>}
      </div>
    )
      
    
    return (
      <><div className="question-text">
        What does your availability look like next week?
        </div>
      <Container>
      <Row>
      <Col sm={4}>
        <ToggleButtonGroup type="radio" name="availability" defaultValue={1} size="lg" id="availability-buttons" vertical>
          <ToggleButton id="tbg-radio-1" variant="outline-success" value={1} onClick={() => setRadioValue('1')}>
            Available
          </ToggleButton>
          <ToggleButton id="tbg-radio-2" variant="outline-warning" value={2} onClick={() => setRadioValue('2')}>
            Flexible
          </ToggleButton>
        </ToggleButtonGroup>
      </Col>
      <Col sm={8}>
      <ScheduleSelector
          selection={schedule}
          startDate={'2022-03-17'}
          numDays={7}
          minTime={9}
          maxTime={20}
          hourlyChunks={1}
          onChange={handleChange}
          renderDateCell={renderCustomDateCell}
        />
      </Col>
      </Row>
      </Container>
      <br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={clickToPrevSection}>Back</Button>
        <Button  id="availability-next" variant="custom-nav" disabled={nextDisabled} onClick={!nextDisabled ? clickToNextSection : null} >
          Next
        </Button>
      </div></>
    )
          }
                
  //this is to prevent rerolling
  const [diceState, setDiceState] = useState(0); 
                 
  function DiceRollQuestion(props) {
    
    const [dice, setDice] = useState(null);
      
    function clickToNextSection() {
          setQuestion(questionNum + 1); 
          setCurSection(3);   
          };
          
    function clickToPrevSection() {
          setQuestion(questionNum - 1);
          setCurSection(2);
    };
    const rollDice = () => {
      dice.rollAll();

      let next = document.getElementById("dice-next");
      next.classList.add("active");
      next.disabled = false;
      next.onclick = clickToNextSection;
    }

    return (
      <>
        <div className="question-text">
          The person who rolls the lowest number will initiate contact!
          </div>
          <div className="question-sub-text">
          You'll find out what your match rolled when the match results are announced :)
          </div>
        {/* Dice Animation */}
                 
          <div style={{marginTop: "5%"}}>
            <ReactDice
              numDice={1}
              rollDone={(num) => {setDiceState(num)}}
              dieSize={125}
              faceColor={"rgb(169, 65, 82)"}
              dotColor={"rgb(255,255,255)"}
              rollTime={0.75}
              disableIndividual={true}
              ref={(dice) => setDice(dice)}
            />  
          </div>
      {/* dice state is initially zero, when the user has not rolled. 
      the UI is replaced when the user rolls the dice */}
      { (diceState === 0) ?
        <>       
      
          <Button id="roll-dice" variant="custom-nav" onClick={rollDice}>
            Try your luck!</Button> 
          </>
        :
        
        <>
        <div className="question-header">You rolled a {diceState}!</div>
       </>
      }
      <><br />
      <div className="question-nav">
        <Button variant="custom-nav" onClick={clickToPrevSection}>Back</Button>
        { (diceState === 0) ? 
            <Button id="dice-next" variant="custom-nav" disabled onClick={clickToNextSection}>
            Next
            </Button>
          :
            <Button id="dice-next" className="active" variant="custom-nav" onClick={clickToNextSection}>
            Next
            </Button> 
        }
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
      <div className="review-section twoCol-container-flex">
        <div className="review-heading twoCol-left-flex"></div>
        <div className="review-text twoCol-right-flex">
          <div id="bubbleContainer">
            {
              Object.entries(factorState)
              .map(([key, value], idx) => 
              ((value !== 2) && 
              <div className="bubble" id={key} key={key}
              style={{marginTop: margins[idx], backgroundColor: (value === 0)? "#048621" : "#A94152"}}>
                <img src={factorImgs[key]} />
                <div className="bubbleText">
                  {factorNames[key]}
                </div>
              </div>))
            }
          </div>
          <div id="bubbleControls">
            <div className="legend">
              <div id="sameBubble" className="legendColor"></div>
              <div className="legendText">same</div>
            </div>
            <div className="legend">
              <div id="differentBubble" className="legendColor"></div>
              <div className="legendText">different</div>
            </div>
          </div>
        </div>
      </div>

      
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
      <Button id="back-home" variant="custom-nav">
        <Link to="/ccnewhome" className="no-decor">Back to home </Link>
      </Button></>
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
              case 'priorities':
                return <PrioritiesQuestion/>
              case 'prioritiesBubbles':
                return <PrioritiesBubblesQuestion/>
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
        <QuestionArea questionNum={questionNum}/>
      </Row>
    </Container>
  )
}

export default CCSignUp;


