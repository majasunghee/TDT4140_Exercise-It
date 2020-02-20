import React from "react";
import Home from "./Home";
import Login from "./components/Login/Login";
import Info from "./components/Info/Info";

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
  login: false,
  info: false
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

  goToInfo = () => {
    this.setState({ defaultState });
    this.setState({ info: !this.state.info });
  };

  leaveLogin = () => {
    localStorage.removeItem("token");
    this.setState(defaultState);
  };

  render() {
    return (
      <Router>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans&display=swap"
          rel="stylesheet"
        ></link>
        <div>
          <Switch>
            <Route exact path="/login">
              <Login
                onAuth={user => this.authenticateUser(user.token)}
                onCancel={() => this.leaveLogin()}
              />
            </Route>
            <Route exact path="/">
              <Home
                user={this.state.user}
                token={this.state.token}
                onLogin={() => this.goToLogin()}
                onInfo={() => this.goToInfo()}
                state={this.state}
              />
            </Route>
            <Route exact path="/info">
              <Info
                user={this.state.user}
                onLogin={() => this.goToLogin()}
                onInfo={() => this.goToInfo()}
                homeButton={() => this.setState({ info: false })}
              />
            </Route>
          </Switch>
        </div>
        {this.state.login ? (
          <Redirect to="/login" />
        ) : this.state.info ? (
          <Redirect to="/info" />
        ) : (
          <Redirect to="/" />
        )}
      </Router>
    );
  }
}

export default App;
