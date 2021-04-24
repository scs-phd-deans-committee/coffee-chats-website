import React from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }
  

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
    <div className="App">
      <h2>Coffee Chats ☕</h2>
      <Login />
      <h2>Existing Users:</h2>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
    </div>
    )
  }
}

export default App;
