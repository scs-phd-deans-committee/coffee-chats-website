// npm install classnames --save
// npm install @animated-burgers/burger-arrow

import React, { useState } from "react";
import { Navbar, Nav, NavItem,  Dropdown } from 'react-bootstrap';
import Login from '../modules/Login';
import logo_image from '../../coffee.png';
import {
  Link,
  Redirect,
  useHistory
} from "react-router-dom";

function CCNavbar(props){
  const [expanded, setExpanded] = useState(false);

  var logoStyle = {
    width: '50px',
    height: '50px',
    padding: "5px",
  };

  var paddingStyle = {
    padding: "0 10px 0 10px"
  };

  var navbarStyle = {
    color: 'black',
    fontSize: '20px',
  };

  var toggleStyle = {
    color: 'black',
    backgroundColor: "transparent",
    padding: "8px",
    border: "1px transparent",
    fontSize: '20px',
  };

  var menuStyle = {
    textDecoration: 'none',
    fontSize: '20px',
  };

  var brandStyle = {
    fontSize: '25px',
    fontWeight: 'bold',
  };

  const history = useHistory();

  return (
    <>
      <Navbar bg="light" expanded={expanded} expand="lg">
        <Navbar.Brand href="/" style={brandStyle}><img src={logo_image} style={logoStyle}/>coffee-chats</Navbar.Brand>
        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills" className="ml-auto" style={navbarStyle}>
              <Nav.Item style={paddingStyle}>
                <Navbar.Text ><Link to="/" onClick={() => setExpanded(false)}>Home</Link></Navbar.Text>
              </Nav.Item>
              { (!!props.user) ?
              <>
                <Nav.Item style={paddingStyle}>
                  <Navbar.Text><Link to="/preferences" onClick={() => setExpanded(false)}><b>Participate!</b></Link></Navbar.Text>
                </Nav.Item>
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Text} style={toggleStyle}>Account</Dropdown.Toggle>
                  <Dropdown.Menu align="right" style={menuStyle}>
                    <Dropdown.Item><Link to="/profile" onClick={() => setExpanded(false)}>Profile</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/matchlist" onClick={() => setExpanded(false)}>Matches</Link></Dropdown.Item>                
                    <Dropdown.Divider />
                    <Dropdown.Item><Link to="/feedback" onClick={() => setExpanded(false)}>Feedback Form</Link></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
              :
              <Nav.Item>
                <Navbar.Text><Link to="/profile" style={paddingStyle} onClick={() => setExpanded(false)}>Sign Up / Login</Link></Navbar.Text>
              </Nav.Item>
              }
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default CCNavbar;
