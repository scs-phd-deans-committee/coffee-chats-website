import React from 'react';

import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId =
  '41952522958-ebqa5q86vk27u60io27llscfnhjsvmrl.apps.googleusercontent.com';

const LOGGEDOUT = "Not Logged In";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'name': LOGGEDOUT,
      'isLoggedIn': false,
      'imgUrl': null
    };
  }

  // Need to look into cookies and stuff.

  onLoginSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    let name = res.profileObj.name;
    this.setState({'name': name, 'isLoggedIn': true, 'imgUrl': res.profileObj.imageUrl})
  }

  onLoginFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  onLogoutSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout successful, peace!');
    this.setState({'name': LOGGEDOUT, 'isLoggedIn': false, 'imgUrl': null})
  };

  render() {
    let comp;
    if (!this.state.isLoggedIn) {
      comp = <div>
          <h1>Not logged in.</h1>
          <br />
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={this.onLoginSuccess}
            onFailure={this.onLoginFailure}
            cookiePolicy={'single_host_origin'}
            style={{ marginTop: '100px' }}
            isSignedIn={true}
          />
        </div>
    } else {
      comp = <div>
          <h1> Current User: {this.state.name} </h1>
          <img src={this.state.imgUrl} />
          <br /> <br />
          <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={this.onLogoutSuccess}
          />
        </div>
    }
    return (
      <div>
        {comp}
      </div>
    );
  }
}

export default Login;
