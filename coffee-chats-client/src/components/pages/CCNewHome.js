import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

import { Link } from "react-router-dom";

import signup_img from "../../signupicon.png";
import matching_img from "../../matchingicon.png";
import results_img from "../../resultsicon.png";

import  "./CCNewHome-styles.css"


function CCNewHome(props) {
    
    function ThreeCircles(props) {
        return (
            <Row>
                <div id="circle" />
                <div id="circle" />
                <div id="circle" />
            </Row>
        );
    }
    
    function SignUpPhase(props) {
        return (
            <div className="phase-section phase-active">
                <Link to="/ccsignup" className="no-decor">
                <Image fluid src={signup_img} alt="Sign Up Icon" className="phase-icon-signup"/>
                <h1 className="phase-header"> Phase 1 </h1>
                <h3 className="deadline"> closes March 17 </h3>
                <Button variant="phase" size="lg" active to="/ccsignup"> 
                    Sign Up Now! 
                </Button>
                </Link>
            </div>
        );
    }
    
    function MatchingPhase(props) {
        return (
            <div className="phase-section phase-inactive">
                <Image fluid src={matching_img} alt="Sign Up Icon" className="phase-icon-matching"/>
                <h1 className="phase-header"> Phase 2 </h1>
                <h3 className="deadline"> March 18 - March 23 </h3>
                <Button variant="phase-inactive" size="lg" disabled to="/ccsignup"> 
                    Forming Matches... 
                </Button>
            </div>
        );
    }
    
    function ResultsPhase(props) {
        return (
            <div className="phase-section phase-inactive">
                <Image fluid src={results_img} alt="Sign Up Icon" className="phase-icon-results"/>
                <h1 className="phase-header-results"> Phase 3 </h1>
                <h3 className="deadline-results"> opens March 25 </h3>
                <Button variant="phase-inactive" size="lg" disabled to="/ccsignup"> 
                    Matches Announced! 
                </Button>
            </div>
        );
    }
    
    return (
        <Container fluid className="phase-area">
            <Row className="justify-content-center">
                <Col sm={3}>
                    <SignUpPhase/>
                </Col>
        
                <Col sm={1.5} className="three-circles">
                    <ThreeCircles/>
                </Col>

                <Col sm={3}>
                    <MatchingPhase/>
                </Col>
        
                <Col sm={1.5} className="three-circles">
                    <ThreeCircles/>
                </Col>
        
                <Col sm={3}>
                    <ResultsPhase/>
                </Col>
            </Row>
        </Container>
    );
}

export default CCNewHome;