// npm install classnames --save
// npm install @animated-burgers/burger-arrow

import React from "react";
import { Navbar, Nav, NavItem,  Dropdown } from 'react-bootstrap';
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
    fontSize: '20px',
  };

  var menuStyle = {
    textDecoration: 'none',
    fontSize: '20px',
  };

  var brandStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const history = useHistory();

  return (
    <>
      <Navbar bg="light" expand="lg">
        <img src={logo_image} style={logoStyle}/>
        <Navbar.Brand href="/" style={brandStyle}>coffee-chats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills" className="ml-auto" style={navbarStyle}>
              <Nav.Item style={paddingStyle}>
                <Navbar.Text ><Link to="/">Home</Link></Navbar.Text>
              </Nav.Item>
              { (!!props.user) ?
              <>
                <Nav.Item style={paddingStyle}>
                  <Navbar.Text><Link to="/preferences"><b>Participate!</b></Link></Navbar.Text>
                </Nav.Item>
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Text} style={toggleStyle}>Account</Dropdown.Toggle>
                  <Dropdown.Menu align="right" style={menuStyle}>
                    <Dropdown.Item><Link to="/profile">Profile</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/matchlist">Matches</Link></Dropdown.Item>                
                    <Dropdown.Divider />
                    <Dropdown.Item><Link to="/feedback">Feedback Form</Link></Dropdown.Item>
                    <Dropdown.Item><button onClick={() => {
                                        props.setUser(null);
                                        localStorage.removeItem("user");
                                        history.push("/");
                                      }}>Logout</button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
              :
              <Nav.Item>
                <Navbar.Text><Link to="/profile" style={paddingStyle}>Sign Up / Login</Link></Navbar.Text>
              </Nav.Item>
              }
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default CCNavbar;
