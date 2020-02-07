import React from "react";
import Home from "./Home";
import Login from "./Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const defaultState = {
  name: "",
  role: ""
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <Login
                onRegister={(name, role) =>
                  this.setState({ name: name, role: role })
                }
              />
            </Route>
            <Route path="/">
              <Home
                state={this.state}
                onLogout={() => this.setState(defaultState)}
              />
            </Route>
          </Switch>
        </div>
        {this.state.role === "" ? (
          <Redirect to="/login" />
        ) : (
          <Redirect to="/" />
        )}
      </Router>
    );
  }
}

export default App;
