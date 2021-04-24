import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Links(props) {
  return (
           <>
             { (!!props.user) ?
               (
                 <>
                   <Link to="/home" onClick={props.handleClick}>Home</Link>
                   <Link to="/profile" onClick={props.handleClick}>Profile</Link>
                   <Link to="/feedback" onClick={props.handleClick}>Feedback Form</Link>
                   <Link to="/matchlist" onClick={props.handleClick}>Your Matches</Link>
                 </>
               ) :
               <>
                 <Link to="/" onClick={props.handleClick}>Login</Link>
               </>
             }
           </>
         )
}

export function BurgerMenu(props) {
  return (
           <div className="burgerLinks">
             <Links isLoggedIn={props.isLoggedIn} handleClick={props.handleClick}/>
           </div>
         )
}
