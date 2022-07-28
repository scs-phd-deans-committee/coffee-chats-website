import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { auth, firestore } from "../../../firebaseClient";
import { firebase } from '@firebase/app';
import "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import the stylesheet
import "react-step-progress/dist/index.css";
import "../styles.css";
import ScheduleSelector from "react-schedule-selector";
import "react-dice-complete/dist/react-dice-complete.css";

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
    props.setQuestion(props.questionNum + 1); 
    props.setCurSection(2);   
    };
    
  function clickToPrevSection() {
        props.setQuestion(props.questionNum - 2);
        props.setCurSection(1);
        };
    
  const [nextDisabled, setNextDisabled] = useState(true);
    
  const [radioValue, setRadioValue] = useState('1');
    
  const availabilities = [
      { name: 'Available', value: '1'},
      { name: 'Flexible', value: '2'},
  ];

  const handleChange = (newSchedule) => {
    setSchedule(newSchedule);
    let next = document.getElementById("availability-next");
    if (newSchedule.length !== 0) {
      next.classList.add("active");
      setNextDisabled(false);
    } else {
      next.classList.remove("active");
      setNextDisabled(true);
    }

    // update custom schedule with additions
    for (let i=0; i<newSchedule.length; i++) {
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
      {selected && customSchedule[time] == '1' && <div className="calendarCell" style={{backgroundColor: '#A94152'}}></div>}
      {selected && customSchedule[time] == '2' && <div className="calendarCell" style={{backgroundColor: '#3F3D56'}}></div>}
    </div>
  )
    

  return (
    <><div className="question-text">
      What's your availability?
      </div>
    <Container fluid>
    <Row fluid className="calendar-row">
    <Col sm={2}>
      <ToggleButtonGroup type="radio" name="availability" defaultValue={1} id="availability-buttons" vertical>
        <ToggleButton variant="custom-calendar" value={1} onClick={() => setRadioValue('1')}>
          <span id="available-toggle"></span>
          available
        </ToggleButton>
        <ToggleButton variant="custom-calendar" value={2} onClick={() => setRadioValue('2')}>
          <span id="flexible-toggle"></span>
          flexible
        </ToggleButton>
      </ToggleButtonGroup>
    </Col>
    <Col sm={10}>
    <ScheduleSelector
        selection={schedule}
        startDate={'2022-03-13'}
        numDays={7}
        minTime={9}
        maxTime={20}
        hourlyChunks={1}
        dateFormat="ddd M/D"
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

export default AvailabilityQuestion;