import React from 'react';

import {
  Redirect,
  useHistory
} from "react-router-dom";

function Preferences(props) {
  const history = useHistory();
  const logoutButton = 
    <button onClick={() => {
      props.setUser(null);
      localStorage.removeItem("user");
      history.push("/");
    }}>Logout!</button>


  if (props.user) {
    return (
      <div className="preferencesContainer">
        <div className="preferences">
          <h1>Preferences Form</h1>

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

export default Preferences;
