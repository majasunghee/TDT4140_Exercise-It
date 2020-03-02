import React from "react";
import styles from "../../App.module.css";

const defaultState = {
  title: "",
  addMusclegroup: "",
  musclegroups: [],
  musclegroupsId: "",
  image: "",
  content: "",
  sets: "",
  reps: "",
  error: false
};

export default class NewExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  post = async () => {
    if (this.checkValidPost()) {
      var date = new Date();
      var dateFormat =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      const formdata = new FormData();
      formdata.append("title", this.state.title);
      formdata.append("date", dateFormat);
      formdata.append("content", this.state.content);
      formdata.append("sets", this.state.sets ? this.state.sets : 1);
      formdata.append("reps", this.state.reps ? this.state.reps : 1);
      formdata.append("image", this.state.image, this.state.image.name);
      formdata.append("relations", this.state.musclegroupsId);
      formdata.append(
        "username",
        this.props.user.username ? this.props.user.username : ""
      );

      var parameters = {
        method: "POST",
        body: formdata,
        redirect: "follow"
      };
      const response = await fetch(
        "http://localhost:8000/exercises/",
        parameters
      );
      const data = await response.json();
      console.log("posting a new exercise..");
      this.props.reFetch();
      this.setState(defaultState);
      return data;
    } else {
      this.setState({ error: true });
    }
  };

  checkValidPost = () => {
    return (
      this.state.title.length > 3 &&
      this.state.title.length < 50 &&
      this.state.image &&
      this.state.content.length > 15
    );
  };

  onChange = change =>
    this.setState({ [change.target.name]: change.target.value });

  filterFound = () => {
    var match = "";
    if (this.state.musclegroups.indexOf(this.state.addMusclegroup) <= -1) {
      this.props.musclegroups.forEach(a =>
        this.state.addMusclegroup === a.name ? (match = a.id) : ""
      );
      return match;
    }
  };

  removeFilter(filter) {
    var oldIds = this.state.musclegroupsId.split(" ").slice(1);
    var newFilters = [];
    var newIds = "";
    oldIds.splice(this.state.musclegroups.indexOf(filter), 1);
    oldIds.forEach(id => (newIds = newIds + " " + id));

    this.state.musclegroups.forEach(a =>
      a !== filter ? newFilters.push(a) : ""
    );
    this.setState({ musclegroups: newFilters, musclegroupsId: newIds });
  }

  addFilter() {
    if (this.filterFound()) {
      this.setState({
        musclegroupsId: this.state.musclegroupsId + " " + this.filterFound(),
        musclegroups: [...this.state.musclegroups, this.state.addMusclegroup],
        addMusclegroup: ""
      });
    }
  }

  render() {
    if (!this.props.isCreating) {
      return <div></div>;
    }
    return (
      <div className={styles.postWrapperPublish}>
        <div className={styles.title}>
          <strong>Legg til ny øvelse</strong>
        </div>
        <div>
          {" "}
          <input
            name="title"
            className={styles.input}
            placeholder="Navn på øvelse"
            value={this.state.title}
            onChange={this.onChange}
          />
          <input
            name="reps"
            type="number"
            className={styles.inputSmall}
            placeholder="Repetisjoner"
            value={this.state.reps}
            onChange={this.onChange}
          />
          <input
            name="sets"
            type="number"
            className={styles.inputSmall}
            placeholder="Antall sett"
            value={this.state.sets}
            onChange={this.onChange}
          />
        </div>
        <div className={styles.postImagePublish}>
          <div className={styles.gradientPublish}>
            <div className={styles.inputImage}>
              Bilde:
              <input
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={change => {
                  this.setState({
                    image: change.target.files[0]
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <textarea
            className={styles.inputField}
            name="content"
            style={{ minHeight: 100 }}
            placeholder="Beskrivelse"
            value={this.state.content}
            onChange={this.onChange}
          />
          <div className={styles.rowSpace}>
            <div>
          <input
            name="addMusclegroup"
            className={
              this.filterFound()
                ? styles.inputMedium
                : styles.inputMediumDisabled
            }
            placeholder="Finn muskelgrupper"
            value={
              this.state.addMusclegroup.charAt(0).toUpperCase() +
              this.state.addMusclegroup.slice(1)
            }
            onChange={this.onChange}
            onKeyPress={event =>
              event.key === "Enter" ? this.addFilter() : ""
            }
          />
          <button
            className={
              this.filterFound()
                ? styles.buttonSmall
                : styles.buttonSmallDisabled
            }
            onClick={() => this.addFilter()}
          >
            Velg
          </button>
          {this.props.user.username === "admin" ? (
            <button
              className={styles.buttonSmall}
              onClick={() => this.props.createMusclegroup()}
            >
              Ny <strong>+</strong>
            </button>
          ) : (
            ""
          )}</div>
          <button
            className={
              this.checkValidPost() ? styles.button : styles.buttonDisabled
            }
            onClick={() => this.post()}
          >
            Publiser
          </button>
        </div></div>
        <div className={styles.row}>
          {this.state.musclegroups.map(musclegroup => (
            <div
              className={styles.filterListPost}
              onClick={() => this.removeFilter(musclegroup)}
            >
              {musclegroup}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
