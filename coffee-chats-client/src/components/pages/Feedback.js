import React from 'react';

import {
  Redirect,
  useHistory
} from "react-router-dom";

function Feedback(props) {
  const history = useHistory();
  const logoutButton = 
    <button onClick={() => {
      props.setUser(null);
      localStorage.removeItem("user");
      history.push("/");
    }}>Logout!</button>


  if (props.user) {
    return (
      <div className="feedbackContainer">
        <div className="feedback">
          <h1>Feedback</h1>

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

export default Feedback;
