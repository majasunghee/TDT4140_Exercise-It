import React from "react";
import Settings from "./components/Settings/Settings";
import Feed from "./components/Feed/Feed";

import styles from "./App.module.css";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      newExercise: false,
      newWorkout: false,
      hideExercises: false,
      hideWorkouts: false
    };
  }

  homeButton = () => {
    this.setState({ newExercise: false, newWorkout: false });
  };

  newExercise = () => {
    if (!this.state.newExercise) {
      window.scrollTo(0, 0);
      this.setState({ newWorkout: false });
    }
    this.setState({ newExercise: !this.state.newExercise });
  };

  newWorkout = () => {
    if (!this.state.newWorkout) {
      window.scrollTo(0, 0);
      this.setState({ newExercise: false });
    }
    this.setState({ newWorkout: !this.state.newWorkout });
  };

  render() {
    return (
      <div>
        <Settings
          user={this.props.user}
          goHome={() => this.homeButton()}
          login={() => this.props.onLogin()}
          info={() => this.props.onInfo()}
          newExercise={() => this.newExercise()}
          newWorkout={() => this.newWorkout()}
          creatingNewExercise={this.state.newExercise}
          creatingNewWorkout={this.state.newWorkout}
          hideExercises={() =>
            this.setState({
              hideWorkouts: !this.state.hideExercises
                ? false
                : this.state.hideWorkouts,
              hideExercises: !this.state.hideExercises
            })
          }
          hideWorkouts={() =>
            this.setState({
              hideExercises: !this.state.hideWorkouts
                ? false
                : this.state.hideExercises,
              hideWorkouts: !this.state.hideWorkouts
            })
          }
          hiddenExercises={this.state.hideExercises}
          hiddenWorkouts={this.state.hideWorkouts}
        />
        <div className={styles.container}>
          <Feed
            defaultHome={() =>
              this.setState({ newExercise: false, newWorkout: false })
            }
            user={this.props.user}
            creatingNewExercise={this.state.newExercise}
            creatingNewWorkout={this.state.newWorkout}
            hiddenExercises={this.state.hideExercises}
            hiddenWorkouts={this.state.hideWorkouts}
            singlePost={post => {
              this.props.singlePost(post);
            }}
            token={this.props.token}
          />
        </div>
      </div>
    );
  }
}

export default Home;
