import React from 'react';

import {
  Redirect,
  useHistory
} from "react-router-dom";

function MatchDetail(props) {
  const history = useHistory();

  const logoutButton = 
    <button onClick={() => {
      props.setUser(null);
      localStorage.removeItem("user");
      history.push("/");
    }}>Logout!</button>


  if (props.user) {
    return (
      <div className="matchdetailContainer">
        <div className="matchdetail">
          <h1>Match Details</h1>

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

export default MatchDetail;
