import React from "react";

import { Link } from "react-router-dom";

import { withRouter } from "react-router";

import styles from "./settings.module.css";

const Settings = props => {
  const newWorkout = () => {
    props.newWorkout();
    if (!props.creatingNewWorkout) {
      props.history.push("/");
    }
  };

  const newExercise = () => {
    props.newExercise();
    if (!props.creatingNewExercise) {
      props.history.push("/");
    }
  };

  const hideExercises = () => {
    props.hideExercises();
    props.history.push("/");
  };

  const hideWorkouts = () => {
    props.hideWorkouts();
    props.history.push("/");
  };

  return (
    <div className={styles.settings}>
      <div>
        <Link to="/">
          <div
            className={styles.logo}
            onClick={() => props.goHome()}
            tabIndex="0"
          >
            Exercise.it!
          </div>
        </Link>
        {!props.showInfo ? (
          <div className={styles.rowSpace}>
            <div
              onClick={() => hideExercises()}
              className={
                props.hiddenExercises
                  ? styles.smallToggleTrue
                  : styles.smallToggleFalse
              }
            >
              Kun økter
            </div>
            <div
              onClick={() => hideWorkouts()}
              className={
                props.hiddenWorkouts
                  ? styles.smallToggleTrue
                  : styles.smallToggleFalse
              }
            >
              Kun øvelser
            </div>{" "}
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        {!props.showInfo ? (
          <div>
            <div
              onClick={() => newExercise()}
              className={
                props.creatingNewExercise
                  ? styles.settingActive
                  : styles.setting
              }
            >
              Legg til øvelse <strong>+</strong>
            </div>
            <div
              onClick={() => newWorkout()}
              className={
                props.creatingNewWorkout ? styles.settingActive : styles.setting
              }
            >
              Opprett økt <strong>+</strong>
            </div>{" "}
          </div>
        ) : (
          ""
        )}
        {props.user.username === "admin" ? (
          <a target="_self" href="http://localhost:8000/admin">
            <div className={styles.setting}>Django-Admin</div>
          </a>
        ) : (
          <Link to="/info">
            <div
              className={
                window.location.href.indexOf("info") > -1
                  ? styles.settingActive
                  : styles.setting
              }
            >
              {" "}
              Informasjon
            </div>
          </Link>
        )}
        <Link to="/login">
          <div className={styles.loginSetting} onClick={() => props.login()}>
            {props.user.username ? "Logg ut" : "Logg inn"}
          </div>{" "}
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Settings);
