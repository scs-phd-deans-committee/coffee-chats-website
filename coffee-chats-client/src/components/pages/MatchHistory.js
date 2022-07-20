// when2meet, current match info, previous match info
// note: only one match for each user per round

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { auth, firestore } from "../../firebaseClient";
import '../../public/stylesheets/Forms.css';

import {
  Redirect,
  useHistory
} from "react-router-dom";

// page corresponding to a single match
function SingleMatchPage(props){
  let match = props.match
  return (
    <>
      <p style={{textAlign: "left"}}><b>Group members: </b></p>
      {match.user_ids.map(
        (user_id) => {
          let user = props.users[user_id];
          return (
            <>
              <div className="profile-display text-center">
                <div><span className="name">{user.name}</span>{user.pronoun ? <span className="pronouns"> ({user.pronoun})</span> : <></>}</div>
                { (user.department || user.year) ?
                  <div>
                    {user.department}, year {user.year}
                  </div>
                  :
                  <></>
                }
                { (user.motto) ?
                  <div><i>"{user.motto}"</i></div>
                  :
                  <></>
                }
              </div>
            </>
          );
        }
      )}
    </>
  )
}

function MatchHistory(props) {
  const [matches, setMatches] = useState(null)
  const [currentMatch, setCurrentMatch] = useState(null)
  const [roundInfo, setRoundInfo] = useState(null)
  const [users, setUsers] = useState(null)
  
  // create mapping of round number to round info
  if (roundInfo == null){
    let roundRef = firestore.collection("rounds").get()
    roundRef.then(snapshot => {
      setRoundInfo(snapshot.docs.map(doc => doc.data()));
    });
  }
  //console.log(roundInfo);

  // button corresponding to a single match
  function SingleMatchButton(props){
    let round = props.match.round;
    let roundStart = roundInfo[round] ? roundInfo[round].start.toDate().toDateString() : <></>;
    let roundEnd = roundInfo[round] ? roundInfo[round].end.toDate().toDateString() : <></>;
    //console.log(props.match.round)
    return (
      <p>
        <Button onClick={() => setCurrentMatch(props.match)} variant="outline-success" size="lg">
          <b>Round {props.match.round}</b>: {roundStart} - {roundEnd}
        </Button>
      </p>
    )
  }


  if (props.user) {
    //console.log('My UID is: ' + props.user.uid)
    
    if (!matches) { // get all of the user's matches
      let matchesRef = firestore.collection("matches");
      
      let userMatches = matchesRef.where("user_ids", "array-contains", props.user.uid);
      userMatches.get().then(snapshot => {
        if (snapshot.empty) {
          console.log('No matches found');
        } else {
          let matchesData = snapshot.docs.map(doc => doc.data());
          matchesData.sort(function(a, b) {
            return b.round - a.round;
          })
          setMatches(matchesData);
          setCurrentMatch(matchesData[0])

          let matchUserIds = matchesData.map(matchData => matchData.user_ids)
          let userIds = new Set([].concat(...matchUserIds))
          //console.log(userIds)

          let usersRef = firestore.collection("users")
          usersRef.where("uid", "in", Array.from(userIds)).get().then(snapshot => {
            let usersData = snapshot.docs.map(user => user.data());
            let uidObjs = {}
            usersData.forEach((userData) => {uidObjs[userData.uid] = userData})
            //console.log(uidObjs);
            //console.log(usersData);
            setUsers(uidObjs);
          })
        }
      });
    } 

    return (
      <Container>
        <h1>Match History</h1>
        <p>Thanks for participating in the coffee chats program!</p>
        <Row>
          <Col sm={6}>
            <h3>Past matches</h3>
            <p>(click for more information):</p>
            {(matches && users) ? 
              <>
                <div className="d-grid gap-2">
                  {matches.map(
                    (match) => {
                      return (<SingleMatchButton match={match}/>);
                    }
                  )}
                </div>
              </>
              : <><p>You do not have any coffee chat matches yet.</p></>
            }
          </Col>
          <Col sm={6}>
            {(currentMatch && users) ? 
              <>
                <h3><span style={{color:"green"}}>Your <b>Round {currentMatch.round}</b> Match:</span></h3>
                <SingleMatchPage match={currentMatch} users={users}/>
              </>
              : <></>
            }
          </Col>
        </Row>
      </Container>
    )
  } else {
    return (
      <Redirect to="/" />
    )
  }
}

export default MatchHistory;
