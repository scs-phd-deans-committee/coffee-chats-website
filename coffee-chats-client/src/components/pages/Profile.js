import React, { useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";

function Profile(props) {

  return (
           <>
             <div className="profileContainer">
               <div className="profile">
                 { props.profile ? 
                   <>
                     <div className="textContainer">
                       <div className="name">Name: {props.profile.name} ({props.profile.pronoun})</div>
                       <div className="department">Department: {props.profile.department}, year {props.profile.year}</div>
                       <div className="motto"><i>{props.profile.motto}</i></div>
                     </div>
                   </>
                   :
                   <div>Not a valid profile!</div>
                 }
               </div>
             </div>
           </>
         )
}

export default Profile;
