import React from "react";

import styles from "../../App.module.css";

const Settings = props => {
  return (
    <div className={styles.settings}>
      <div onClick={() => props.goHome()}>
        <div className={styles.logo}>Exercise-It!</div>

      <input className={styles.inputSetting}
      placeholder="Muskelgrupper"/>
      <input className={styles.inputSetting}
      placeholder="Øvelse"/>
      </div>
      {/* <div className={styles.filter}>
        <h3><strong>Sorter postene:</strong></h3>
            <br />
            {this.state.musclegroups.map(tag => (
              <div
                onClick={() =>
                  this.state.valgteMuskler.includes(tag)
                    ? this.setState({
                        valgteMuskler: this.state.valgteMuskler.filter(
                          a => a !== tag
                        )
                      })
                    : this.setState(prev => ({
                        valgteMuskler: [...prev.valgteMuskler, tag]
                      }))
                }
                className={
                  this.state.valgteMuskler.includes(tag)
                    ? styles.choosenLink
                    : styles.filterLink
                }
              >
                {tag.name}
              </div>
            ))}
            {!this.state.loading ? (this.state.exercises.map(øvelse => (
              <div
                onClick={() =>
                  this.state.valgteØvelser.includes(øvelse.title)
                    ? this.setState({
                        valgteØvelser: this.state.valgteØvelser.filter(
                          a => a !== øvelse.title
                        )
                      })
                    : this.setState(prev => ({
                        valgteØvelser: [...prev.valgteØvelser, øvelse.title]
                      }))
                }
                className={
                  this.state.valgteØvelser.includes(øvelse.title)
                    ? styles.choosenLink
                    : styles.filterLink
                }
              >
                {øvelse.title}
              </div>
            ))) : ''}
          </div> */}
      <div className={styles.buttonRow}>
        {!props.showInfo ? (
          <div>
            <div
              onClick={() => props.hideExercises()}
              className={
                props.hiddenExercises ? styles.settingActive : styles.setting
              }
            >
              Skjul øvelser
            </div>
            <div
              onClick={() => props.hideWorkouts()}
              className={
                props.hiddenWorkouts ? styles.settingActive : styles.setting
              }
            >
              Skjul treningsøkter
            </div>
            <div
              onClick={() => props.newExercise()}
              className={
                props.creatingNewExercise
                  ? styles.settingActive
                  : styles.setting
              }
            >
              Legg til ny øvelse +
            </div>
            <div
              onClick={() => props.newWorkout()}
              className={
                props.creatingNewWorkout ? styles.settingActive : styles.setting
              }
            >
              Opprett treningsøkt +
            </div>{" "}
          </div>
        ) : (
          ""
        )}
        {props.user.username === "admin" ? (
          <a target="_self" href="http://localhost:8000/admin">
            <div className={styles.loginSetting}>Django-Admin</div>
          </a>
        ) : (
          <div
            onClick={() => props.info()}
            className={props.showInfo ? styles.settingActive : styles.setting}
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
