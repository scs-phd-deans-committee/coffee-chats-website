import React from 'react';

import {
  Redirect,
  useHistory
} from "react-router-dom";

function Preferences(props) {
  const history = useHistory();

  if (props.user) {
    return (
      <div className="preferencesContainer">
        <div className="preferences">
          <h1>Preferences Form</h1>
        </div>
      </div>
    )
  } else {
    return (
      <Redirect to="/profile" />
    )
  }
}

export default Preferences;
