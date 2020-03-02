import React from "react";
import styles from "../../App.module.css";

export default class NewMusclegroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { musclegroup: "" };
  }

  post = async () => {
    const formdata = new FormData();
    formdata.append("name", this.state.musclegroup);
    formdata.append("latin", "*");

    var parameters = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };
    const response = await fetch(
      "http://localhost:8000/musclegroups/",
      parameters
    );
    const data = await response.json();
    console.log("creating a new musclegroup..");
    this.props.reFetch();
    this.setState({ musclegroup: "" });
    return data;
  };

  render() {
    if (!this.props.isCreating) {
      return <div></div>;
    }
    return (
      <div className={styles.postWrapperExtra}>
        <div className={styles.title}>
          <strong>Legg til ny muskelgruppe</strong>
        </div>
        <input
          name="musclegroup"
          className={
            this.state.musclegroup.length > 2 &&
            this.props.musclegroups.filter(
              a => a.name === this.state.musclegroup
            ).length === 0
              ? styles.input
              : styles.inputDisabled
          }
          placeholder="Navn på muskelgruppe"
          value={
            this.state.musclegroup.charAt(0).toUpperCase() +
            this.state.musclegroup.slice(1)
          }
          onChange={change =>
            this.setState({ musclegroup: change.target.value })
          }
          onKeyPress={event =>
            event.key === "Enter"
              ? this.state.musclegroup.length > 2 &&
                this.props.musclegroups.filter(
                  a => a.name === this.state.musclegroup
                ).length === 0
                ? this.post()
                : ""
              : ""
          }
        />
        <button
          disabled={
            this.state.musclegroup.length <= 2 ||
            this.props.musclegroups.filter(
              a => a.name === this.state.musclegroup
<<<<<<< HEAD
            ).length !== 0
=======
            ).length != 0
>>>>>>> 38afa92394ff0ff48b8f6bb5d021df1577455a79
          }
          className={
            this.state.musclegroup.length > 2 &&
            this.props.musclegroups.filter(
              a => a.name === this.state.musclegroup
            ).length === 0
              ? styles.buttonSmall
              : styles.buttonSmallDisabled
          }
          onClick={() => this.post()}
        >
          Legg til
        </button>
      </div>
    );
  }
}
