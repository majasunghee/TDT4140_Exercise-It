import React from "react";
import Home from "./Home";
import Login from "./components/Login/Login";

import { getUser } from "./actions/user";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const defaultState = {
  user: {},
  token: "",
  login: false
};

let authenticatedUser = {};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  componentDidMount() {
    this.authenticateUser(localStorage.getItem("token"));
  }

  authenticateUser = token => {
    if (token) {
      localStorage.setItem("token", token);
      getUser(token)
        .then(user => (authenticatedUser = user))
        .then(() =>
          this.setState({ login: false, token: token, user: authenticatedUser })
        );
    }
  };

  goToLogin = () => {
    localStorage.removeItem("token");
    this.setState(defaultState);
    this.setState({ login: true });
  };

  leaveLogin = () => {
    localStorage.removeItem("token");
    this.setState(defaultState);
  };

  render() {
    return (
      <Router>
      <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"></link>
        <div>
          <Switch>
            <Route exact path="/login">
              <Login
                onAuth={user => this.authenticateUser(user.token)}
                onCancel={() => this.leaveLogin()}
              />
            </Route>
            <Route path="/">
              <Home
                user={this.state.user}
                token={this.state.token}
                onLogin={() => this.goToLogin()}
                state={this.state}
              />
            </Route>
          </Switch>
        </div>
        {this.state.login ? <Redirect to="/login" /> : <Redirect to="/" />}
      </Router>
    );
  }
}

export default App;
