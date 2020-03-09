import React from "react";
import Settings from "../Settings/Settings";

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
        <div className={styles.container}>
          <div className={styles.infoHeader}>
            <div className={styles.mainHeader}>Exercise-It!</div>
            <br />
            <p>En aktiv side for deg som ønsker å dele trening og bli inspirert</p>
            <p>Gruppe 62, Programvareutvikling</p>
            <p>NTNU Våren 2020</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
