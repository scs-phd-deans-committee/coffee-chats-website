// npm install classnames --save
// npm install @animated-burgers/burger-arrow

import React, { useState } from "react";
// import { get, post } from "../utilities";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap'
import logo_image from '../../coffee.png';

function CCNavbar(props){
  const isLoggedIn = (!!props.user);
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
      />
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">CMU Coffee Chats</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/home">Home</Link>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/profile">Profile</Link>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/feedback">Feedback Form</Link>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/matchlist">Your Matches</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
  );
}

export default CCNavbar;