import React from "react";
import styles from "./newPost.module.css";

const defaultState = {
  title: "",
  addExercise: "",
  exercises: [],
  exercisesId: "",
  image: "",
  content: "",
  duration: "",
  error: false,
  visibility: true
};

export default class NewWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  post = async userdata => {
    if (this.checkValidPost()) {
      var date = new Date();
      var dateFormat =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      const formdata = new FormData();
      formdata.append("title", this.state.title);
      formdata.append("date", dateFormat);
      formdata.append("content", this.state.content);
      formdata.append("duration", this.state.duration);
      formdata.append("image", this.state.image, this.state.image.name);
      formdata.append("relations", this.state.exercisesId);
      formdata.append("visibility", this.state.visibility);
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
        "http://localhost:8000/workouts/",
        parameters
      );
      const data = await response.json();
      console.log("posting a new workout..");
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
      this.state.content.length > 15 &&
      this.state.duration
    );
  };

  onChange = change =>
    this.setState({ [change.target.name]: change.target.value });

  onChange = change =>
    this.setState({ [change.target.name]: change.target.value });

  filterFound = () => {
    var match = "";
    if (this.state.exercises.indexOf(this.state.addExercise) <= -1) {
      this.props.exercises.forEach(a =>
        this.state.addExercise === a.title ? (match = a.id) : ""
      );
      return match;
    }
  };

  removeFilter(filter) {
    var oldIds = this.state.exercisesId.split(" ").slice(1);
    var newFilters = [];
    var newIds = "";
    oldIds.splice(this.state.exercises.indexOf(filter), 1);
    oldIds.forEach(id => (newIds = newIds + " " + id));

    this.state.exercises.forEach(a => (a !== filter ? newFilters.push(a) : ""));
    this.setState({ exercises: newFilters, exercisesId: newIds });
  }

  addFilter() {
    if (this.filterFound()) {
      this.setState({
        exercisesId: this.state.exercisesId + " " + this.filterFound(),
        exercises: [...this.state.exercises, this.state.addExercise],
        addExercise: ""
      });
    }
  }

  render() {
    if (!this.props.isCreating) {
      return <div className={styles.postWrapperEmpty}></div>;
    }

    return (
      <div className={styles.postWrapperPublish}>
        <div className={styles.title}>
          <strong>Opprett treningsøkt</strong>
        </div>
        <div>
          <input
            name="title"
            className={styles.input}
            placeholder="Tittel på økt"
            value={this.state.title}
            onChange={this.onChange}
          />
          <input
            name="duration"
            type="number"
            className={styles.inputSmall}
            placeholder="Varighet"
            value={this.state.duration}
            onChange={this.onChange}
          />

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
              </div>{" "}
            </div>{" "}
          </div>
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
            name="addExercise"
            className={
              this.filterFound()
                ? styles.inputMedium
                : styles.inputMediumDisabled
            }
            placeholder="Finn øvelser"
            value={
              this.state.addExercise.charAt(0).toUpperCase() +
              this.state.addExercise.slice(1)
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
          </button></div>
          <button 
            className={this.state.visibility ? styles.buttonVis : styles.buttonNotVis} 
            onClick={() => this.setState({ visibility: !this.state.visibility })} >
              {this.state.visibility ? "Synlig" : "Skjult"}
          </button>
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
          {this.state.exercises.map(exercise => (
            <div
              className={styles.filterListPost}
              onClick={() => this.removeFilter(exercise)}
            >
              {exercise}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
