import React from 'react';
// import Navbar from './modules/Navbar';
function Home(props) {

  return (
    <div>
    { (!!props.user) ?  
      
      <div>Welcome, {props.user.name}!</div> :

      <div>To participate, sign up or login using the button in the top right corner!</div>
    }
    </div>
  )
}

export default Home;
