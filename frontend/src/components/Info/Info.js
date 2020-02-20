import React from "react";
import Settings from "../Settings/Settings";
import Feed from "../Feed/Feed";
import PostContainer from "../Post/PostContainer";

import styles from "../../App.module.css";

class Info extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: true,
      post: {},
      newExercise: false,
      newWorkout: false,
      hideExercises: false,
      hideWorkouts: false
    };
  }

  homeButton = () => {
    this.setState({ feed: true, newExercise: false, newWorkout: false });
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
      <div className={this.state.light ? styles.lightMode : ""}>
        <Settings
          user={this.props.user}
          showInfo
          goHome={() => this.props.homeButton()}
          login={() => this.props.onLogin()}
          info={() => this.props.onInfo()}
        />
        <div className={styles.container}>
          <div className={styles.mainHeader}>Exercise-It!</div>
          <div className={styles.mainHeader}>
            En aktiv side for deg som ønsker å dele trening og bli inspirert
          </div>
          <br />
          <div className={styles.mainHeader}>
            Gruppe 62, Programvareutvikling
          </div>
          <div className={styles.mainHeader}>NTNU Våren 2020</div>
        </div>
      </div>
    );
  }
}

export default Info;
