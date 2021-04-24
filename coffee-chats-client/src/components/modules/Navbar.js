// npm install classnames --save
// npm install @animated-burgers/burger-arrow

import React, { useState } from "react";
// import { get, post } from "../utilities";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap'
import logo_image from '../../coffee.png';

function CCNavbar(props){
  var logoStyle = {
    width: '50px',
    height: '50px',
  };

  var linkStyle = {
    color: 'black',
    fontSize: '20px'
  };

  var brandStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
      />
      <Navbar bg="light" expand="lg">
        <img src={logo_image} style={logoStyle}/>&nbsp;&nbsp;&nbsp;
        <Navbar.Brand href="/home" style={brandStyle}>CMU Coffee Chats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          { (!!props.user) ?
            <Nav className="ml-auto">
              <NavDropdown.Item><Link to="/home" style={linkStyle}>Home</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="/profile" style={linkStyle}>Your Profile</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="/matchlist" style={linkStyle}>Your Matches</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="/feedback" style={linkStyle}>Feedback Form</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="/preferences" style={linkStyle}><b>Participate!</b></Link></NavDropdown.Item>
            </Nav> :
            <Nav className="ml-auto">
              <NavDropdown.Item><Link to="/home" style={linkStyle}>Home</Link></NavDropdown.Item>
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default CCNavbar;