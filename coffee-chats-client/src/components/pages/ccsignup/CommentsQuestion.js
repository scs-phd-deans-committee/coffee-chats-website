import React, { useEffect, useState } from 'react';
import { Button, Form, ToggleButton } from 'react-bootstrap';
// import the stylesheet
import "react-step-progress/dist/index.css";
import "../styles.css";
import "react-dice-complete/dist/react-dice-complete.css";

function CommentsQuestion(props) {
    function clickToNextSection() {
        props.setQuestion(props.questionNum + 1); 
        props.setCurSection(4);   
    };
            
    function clickToPrevSection() {
        props.setQuestion(props.questionNum - 1);
        props.setCurSection(2);
    };
    return (
        <><div className="question-text">
        That’s it, you’re ready to submit! Do you have any final comments for us to consider in finding you the best match?
        </div>
        <Form.Control id="comments-box" as="textarea" rows={10} placeholder="Additional thoughts" />
        <br />
        <div className="question-nav">
        <Button variant="custom-nav" onClick={clickToPrevSection}>Back</Button>
        <Button id="comments-next" variant="custom-nav" onClick={clickToNextSection}>
            Next
        </Button>
        </div></>
    )
}

export default CommentsQuestion;