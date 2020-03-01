import React from "react";

import styles from "../../App.module.css";

const Settings = props => {
  return (
    <div className={styles.settings}>
      <div onClick={() => props.goHome()}>
        <div className={styles.logo}>Exercise-It!</div>
        {!props.showInfo ? ( <div className={styles.rowSpace}>
            <div
              onClick={() => props.hideExercises()}
              className={
                props.hiddenExercises ? styles.smallToggleTrue : styles.smallToggleFalse
              }
            >
              Kun økter
            </div>
            <div
              onClick={() => props.hideWorkouts()}
              className={
                props.hiddenWorkouts ? styles.smallToggleTrue : styles.smallToggleFalse
              }
            >
              Kun øvelser
            </div> </div> ): ''}
      </div>
      <div >
        {!props.showInfo ? (
          <div>
            <div
              onClick={() => props.newExercise()}
              className={
                props.creatingNewExercise
                  ? styles.settingActive
                  : styles.setting
              }
            >
              Legg til øvelse <strong>+</strong>
            </div>
            <div
              onClick={() => props.newWorkout()}
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
          <div
            onClick={() => props.info()}
            className={window.location.href.indexOf("info") > -1 ? styles.settingActive : styles.setting}
          >
            Informasjon
          </div>
        )}
        <div onClick={() => props.login()} className={styles.loginSetting}>
          {props.user.username ? "Logg ut" : "Logg inn"}
        </div>
      </div>
    </div>
  );
};

export default Settings;
