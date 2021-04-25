import React from 'react';


import {
  Redirect,
  useHistory
} from "react-router-dom";

function MatchHistory(props) {
  const history = useHistory();

  const logoutButton = 
    <button onClick={() => {
      props.setUser(null);
      localStorage.removeItem("user");
      history.push("/");
    }}>Logout!</button>


    if (props.user) {
      return (
        <div className="matchhistoryContainer">
          <div className="matchhistory">
            <h1>Match History</h1>

            {logoutButton}
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
