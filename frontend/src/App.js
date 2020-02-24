import React from "react";
import Home from "./Home";
import Login from "./components/Login/Login";
import Info from "./components/Info/Info";
import PostContainer from "./components/Post/PostContainer";

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
  info: false,
  feed: true,
  post: {},
  postUrl: window.location.href.split("posts/")[1] ? window.location.href.split("posts/")[1].toString() : ''
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
                singlePost={post => this.setState({ feed: false, post: post})}
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
            <Route path="/posts">
              <PostContainer
              user={this.state.user}
              token={this.state.token}
              onLogin={() => this.goToLogin()}
              onInfo={() => this.goToInfo()}
              setRoute={() => this.setState({feed: false})}
              homeButton={() => this.setState({feed: true})}
              />
              </Route> 
           </Switch>
        </div>
        {this.state.login ? (
          <Redirect to="/login" />
        ) : this.state.info ? (
          <Redirect to="/info" />
        ) : this.state.feed ? (
          <Redirect to="/" /> ) : <Redirect to={"/posts/" + ( this.state.postUrl
          ? this.state.postUrl : this.state.post.id )} />
        }
      </Router>
    );
  }
}

export default App;
