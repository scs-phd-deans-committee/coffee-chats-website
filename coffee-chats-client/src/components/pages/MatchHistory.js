// when2meet, current match info, previous match info
// note: only one match for each user per round

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { auth, firestore } from "../../firebaseClient";


import {
  Redirect,
  useHistory
} from "react-router-dom";

function MatchHistory(props) {
  const history = useHistory();
  const [matches, setMatches] = useState(null);
  const [currentMatch, setCurrentMatch] = useState(null);

  if (props.user) {
    console.log('My UID is: ' + props.user.uid)
    
    if (matches == null) { // get all of the user's matches
      let matchesRef = firestore.collection("matches_test");
      
      let userMatches = matchesRef.where("user_ids", "array-contains", props.user.uid);
      userMatches.get().then(snapshot => {
        if (snapshot.empty) {
          console.log('No matches found');
        } else {
          let theseMatches = snapshot.docs.map(doc => doc.data());
          theseMatches.sort(function(a, b) {
            return a.round - b.round;
          })
          setMatches(theseMatches);
          console.log('lastmatch')
          console.log(theseMatches[theseMatches.length - 1]);
          setCurrentMatch(theseMatches[theseMatches.length - 1])
        }
      });
    } else {  // matches have been loaded
      // let usersRef = firestore.collection("users");
      // let users = [];
      // matches.forEach(match => {
      //   match.user_ids.forEach(uid => {
      //     usersRef.doc(uid).get().then(userSnapshot => users.push(userSnapshot.data()));
      //   });
      // });
      // console.log(users);
    }

    
    // matchesRef.get().then((doc) => {
    //   doc.forEach(match => {
    //     let data = match.data()
    //     if ((data.uids).includes(props.user.uid)){
    //       let round = data.round;
    //       let responses = data.responses;
    //       console.log(data);
    //     }
    //   });
    // });

    return (
      <div className="matchhistoryContainer">
        <div className="matchhistory">
          <h1>Match History</h1>
          {matches ? 
            matches.map(
              (match) => {
                return (<button onClick={() => setCurrentMatch(match)}>{match.round}</button>);
              }
            )
            : <></>
          }
          {currentMatch ? 
            <p>{currentMatch.round}</p>
            : <></>
          }
        </div>
      </div>
    )
  } else {
    return (
      <Redirect to="/" />
    )
  }
}

export default MatchHistory;
