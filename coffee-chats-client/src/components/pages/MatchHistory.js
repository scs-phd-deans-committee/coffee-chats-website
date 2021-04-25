import React from 'react';


import {
  Redirect,
  useHistory
} from "react-router-dom";

function MatchHistory(props) {
  const history = useHistory();

  if (props.user) {
    return (
      <div className="matchhistoryContainer">
        <div className="matchhistory">
          <h1>Match History</h1>
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
