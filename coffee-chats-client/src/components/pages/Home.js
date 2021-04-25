import React, { useState } from 'react';

import { Container, Row, Column } from 'react-bootstrap';

import { auth, firestore } from "../../firebaseClient";
import { firebase } from '@firebase/app';
import "firebase/auth";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Modal, ModalDialog, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Home(props) {

  return (
    <Container>
      <br/><br/>
      <Row>
      { (!!props.user) ?  
      <h3>Welcome, {props.user.name}!</h3> :
      <h3>To participate, please <Link to="/profile"><b>sign up / log in!</b></Link></h3>
      }
      <br/><br/><br/>
      <div className="text-left">
        <p>Sign-ups for this round of Cross-Campus Coffee Chats are open!
        This is a biweekly campus-wide program that encourages spontaneous 
        one-on-one and small group socializing between graduate students. 
        To participate, just fill out a form with details about yourself and 
        who you’d like to meet and our algorithm will match you.</p>

        <b>How it works:</b>
        <ol>
          <li><b><Link to="/preferences">Fill out the form</Link> by the end of this Friday, anywhere on earth.</b></li>
          <li>By the end of the weekend, we will email you and your match(es) with what you've paired on and suggested meeting times.</li>
          <li>Hop on a zoom call or meet up outside! If meeting in person, please obey social distancing and wear masks. If you aren't feeling well, please meet over Zoom.</li>
        </ol>
        
        <p>You can use this program in many different ways! <br/>
        For example, use it to socialize with different majors (or within your own), meet people with the same minority background, find connections for your interdisciplinary projects, or seek advice from other students.  
        This program will run once every two weeks. The form is open for one week and we will send out matches the following week.</p>

        <p><u>Please only sign up if you can commit an hour next week.</u> If you sign up and don't reply to your chat group, you may be letting them down; instead, participate during another round.</p>

        <p>If you participated in the past, give us feedback <Link to="/feedback">here</Link>.</p>

        <p>Data privacy disclaimer: We will never share any individual’s form answers. We may publish aggregate information about form responses to help ensure the continuation of this program. You may permit or deny the inclusion of your data in the aggregate info we publish with the questions at the end of the form.</p>

        <p>If you have any questions, comments, concerns, or want to help with the program, please reach out to grad-coffee-chats@andrew.cmu.edu.</p>
      </div>
      </Row>
      <Row>
        <div className="text-left">
          <h2>FAQ</h2><br/>
          <ul>
            <li><b>The form is soooo long…</b><br/>Other than the first section, the questions are optional. You can leave the rest empty, your match will just be more random. You can also save time by re-using your old responses: find the form submission confirmation email, click on the included link, optionally edit, and resubmit.</li><br/>
            <li><b>Can I change my form answers from time to time?</b><br/>Of course.</li><br/>
            <li><b>Will I get grouped with the same people again?</b><br/>No. But if you want to meet your old group again, we encourage you to take the initiative now that you all have met.</li><br/>
            <li><b>What’s the beverage/snack reimbursement process?</b><br/>Varies by department. Not available for all departments (we’re working on it). Check with your department’s GSA rep. </li><br/>
            <li><b>I keep matching with people I know?</b><br/>It’s hard for us to avoid, but you can not include your department in the list of preferred departments or put a note for us in the special requests.</li><br/>
            <li><b>How does matching work?</b><br/>It’s mostly automated. We run an algorithm on your responses (more info here) and may make groupings manually if you have special requests, etc.. We can’t guarantee a perfect match, but we try our best.</li><br/>
          </ul>
        </div>
      </Row>
    </Container>
  )
}

export default Home;
