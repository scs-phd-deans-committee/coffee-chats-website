import React, { useState } from "react";
// import { get, post } from "../utilities";
import { Link } from "react-router-dom";
import Headroom from "react-headroom";
import Burger from '@animated-burgers/burger-arrow' 
import '@animated-burgers/burger-arrow/dist/styles.css' 

import { Links, BurgerMenu } from "../modules/Menu.js";
import logo_image from "../../public/icons/coffee.png";

function Navbar(props){
  const [burgerOpen, setBurgerOpen] = useState(false);

  const isLoggedIn = (!!props.user);

  function handleBurgerClick(e) {
    e.preventDefault();
    console.log("clicked burger");
    setBurgerOpen(!burgerOpen);
  }

  function handleLinkClick(e) {
    console.log("clicked link");
    setBurgerOpen(!burgerOpen);
  }

  return (
    <>
      <Headroom className="navbar">
        <div className="flexcontainer">
          <div className="logo">
            <Link to="/">
              <img src={logo_image}/> 
              // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </Link>
            <Link to="/">
              <span>CMU Coffee Chats</span>  
            </Link>
          </div>
          <div className="navLinks">
            <Links isLoggedIn={isLoggedIn} handleClick={handleLinkClick}/>
          </div>
          <Burger isOpen={ burgerOpen } direction="up" onClick={handleBurgerClick}/>
        </div>
        { burgerOpen ? 
            <BurgerMenu isLoggedIn={isLoggedIn} handleClick={handleLinkClick}/>
          :
          <></>
        }
      </Headroom>
    </>
  );
}

export default Navbar;