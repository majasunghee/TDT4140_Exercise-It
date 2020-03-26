import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Feed from "./components/Feed/Feed";
import PostLarge from "./components/Post/PostLarge";
import Login from "./components/Login/Login";
import Info from "./components/Settings/Info";
import Settings from "./components/Settings/Settings";

import { getUser } from "./fetch/user";

//Main class to render the react-app
//Contains info about the user as state, if logged in
class ExerciseIt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    user: {},
    token: "",
    //States to control what settings are active
    newExercise: false,
    newWorkout: false,
    hideExercises: false,
    hideWorkouts: false
    };
  }

  //Function to log in user with token from login-page or cookies
  //Returns false if token is not provided
  authenticateUser = token => {
    if (token) {
      localStorage.setItem("token", token);
      getUser(token)
        .then(user => this.setState({ token: token, user: user }));
      return true;
    }
    return false;
  };

  //Function to remove the user from state and cookies
  removeUser = () => {
    localStorage.removeItem("token");
    this.setState({ user: {}, token: "", });
  };

  //Every time app refreshes, try to log in user from cookies
  componentDidMount() {
    this.authenticateUser(localStorage.getItem("token"));
  }

  //Settings should always be displayed when not on login-page
  //Function to display settings with props, identical for all routes
  buildSettings = () => {
    return (
    <Settings
      user={this.state.user}
      goHome={() => this.homeButton()}
      login={() => this.removeUser()}
      newExercise={() => this.newExercise()}
      newWorkout={() => this.newWorkout()}
      creatingNewExercise={this.state.newExercise}
      creatingNewWorkout={this.state.newWorkout}
      hideExercises={() => this.setState({ hideExercises: !this.state.hideExercises, hideWorkouts: false})}
      hideWorkouts={() => this.setState({ hideWorkouts: !this.state.hideWorkouts, hideExercises: false})}
      hiddenExercises={this.state.hideExercises}
      hiddenWorkouts={this.state.hideWorkouts}
    />)
  }

  //Reset the state for settings when home-button is clicked
  homeButton = () => {
    this.setState({ newExercise: false, newWorkout: false,
      hideExercises: false, hideWorkouts: false });
  };

  //Toggles the publish exercise-box when clicked from settings
  newExercise = () => {
    if (!this.state.newExercise) {
      window.scrollTo(0, 0);
      this.setState({ newWorkout: false });
    }
    this.setState({ newExercise: !this.state.newExercise });
    return true;
  };

  //Toggles the publish workout-box when clicked from settings
  newWorkout = () => {
    if (!this.state.newWorkout) {
      window.scrollTo(0, 0);
      this.setState({ newExercise: false });
    }
    this.setState({ newWorkout: !this.state.newWorkout });
    return true;
  };

  //Render method to display content for the app
  //Contains the routing and switch between components
  //Checks what URL it is, and routes user to correct component
  render() {
    window.scrollTo(0, 0);
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {this.buildSettings()}
              <Feed
                user={this.state.user}
                creatingNewExercise={this.state.newExercise}
                creatingNewWorkout={this.state.newWorkout}
                hiddenExercises={this.state.hideExercises}
                hiddenWorkouts={this.state.hideWorkouts}
                token={this.state.token}
                home={this.homeButton}
              />
            </Route>
            <Route path="/posts">
              {this.buildSettings()}
              <PostLarge
                user={this.state.user}
                token={this.state.token}
                onDelete={() => this.forceUpdate()}
              />
            </Route>
            <Route exact path="/info">
              {this.buildSettings()}
              <Info />
            </Route>
            <Route exact path="/login">
              <Login
                onAuth={user => this.authenticateUser(user.token)}
                onCancel={() => this.leaveLogin()}
              />
            </Route>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default ExerciseIt;