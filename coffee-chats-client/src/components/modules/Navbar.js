// npm install classnames --save
// npm install @animated-burgers/burger-arrow

import React from "react";
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import Login from '../modules/Login';
import logo_image from '../../coffee.png';
import {
  Link,
  Redirect,
  useHistory
} from "react-router-dom";

function CCNavbar(props){
  var logoStyle = {
    width: '50px',
    height: '50px',
  };

  var linkStyle = {
    color: 'black',
    fontSize: '20px',
    rightMargin: '10px',
  };

  var brandStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
  };

  const history = useHistory();

  return (
    <>
      <Navbar bg="light" expand="lg">
        <img src={logo_image} style={logoStyle}/>&nbsp;&nbsp;&nbsp;
        <Navbar.Brand href="/" style={brandStyle}>CMU Grad Student Coffee Chats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          { (!!props.user) ?
            <Nav className="ml-auto">
              <Nav.Link><Link to="/" style={linkStyle}>Home</Link></Nav.Link>
              <Nav.Link><Link to="/preferences" style={linkStyle}><b>Participate!</b></Link></Nav.Link>
              <NavDropdown title="Your Account" id="basic-nav-dropdown" style={linkStyle}>
                <NavDropdown.Item><Link to="/profile" style={linkStyle}>Your Profile</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/matchlist" style={linkStyle}>Your Matches</Link></NavDropdown.Item>                
                <NavDropdown.Item><Link to="/feedback" style={linkStyle}>Feedback Form</Link></NavDropdown.Item>
                <NavDropdown.Item><button onClick={() => {
                                    props.setUser(null);
                                    localStorage.removeItem("user");
                                    history.push("/");
                                  }}>Logout</button></NavDropdown.Item>
              </NavDropdown>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </Nav> :
            <Nav className="ml-auto">
              <NavDropdown.Item><Link to="/" style={linkStyle}>Home</Link></NavDropdown.Item>
              <NavDropdown.Item><Login user={props.user} setUser={props.setUser} /></NavDropdown.Item>
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default CCNavbar;
