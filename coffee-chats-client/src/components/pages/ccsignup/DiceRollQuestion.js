import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
// import the stylesheet
import "react-step-progress/dist/index.css";
import "../styles.css";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";

function DiceRollQuestion(props) {
    const [dice, setDice] = useState(null);
        
    function clickToNextSection() {
            props.setQuestion(props.questionNum + 1); 
            props.setCurSection(3);   
            };
            
    function clickToPrevSection() {
            props.setQuestion(props.questionNum - 1);
            props.setCurSection(2);
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
            The person who rolls the lowest number will initiate contact :)
            </div>
        {/* Dice Animation */}
                    
            <div style={{marginTop: "5vh"}}>
            <ReactDice
                numDice={1}
                rollDone={(num) => {props.setDiceState(num)}}
                dieSize={200}
                faceColor={"rgb(169, 65, 82)"}
                dotColor={"rgb(255,255,255)"}
                rollTime={0.75}
                disableIndividual={props.diceState !== 0}
                ref={(dice) => setDice(dice)}
            />  
            </div>
        {/* dice state is initially zero, when the user has not rolled. 
        the UI is replaced when the user rolls the dice */}
        { (props.diceState === 0) ?
        <>       
        
            <Button id="roll-dice" variant="custom-nav" onClick={rollDice}>
            Try your luck!</Button> 
            </>
        :
        
        <>
        <div className="dice-result">You rolled a {props.diceState}!</div>
        </>
        }
        <><br />
        <div className="question-nav">
        <Button variant="custom-nav" onClick={clickToPrevSection}>Back</Button>
        { (props.diceState === 0) ? 
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

export default DiceRollQuestion;