import React from "react";
import styles from "../../App.module.css";

const defaultState = {
  title: "",
  musclegroups: "",
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
      console.log(this.props.user)
      const formdata = new FormData();
      formdata.append("title", this.state.title);
      formdata.append("date", dateFormat);
      formdata.append("content", this.state.content);
      formdata.append("sets", this.state.sets);
      formdata.append("reps", this.state.reps);
      formdata.append("image", this.state.image, this.state.image.name);
      formdata.append("relations", this.state.musclegroups);
      formdata.append("username", this.props.user.username)

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
      this.props.createNew();
      this.setState(defaultState);
      return data;
    } else {
      this.setState({ error: true });
    }
  };

  checkValidPost = () => {
    return (
      this.state.title.length > 3 &&
      this.state.image &&
      this.state.content.length > 20
    );
  };

  onChange = change =>
    this.setState({ [change.target.name]: change.target.value });

  render() {
    return (
      <div
        onClick={() => !this.props.isCreating && this.props.createNew()}
        className={this.props.isCreating ? styles.newPost : styles.triggerPost}
      >
        <div>
          <strong>Legg til øvelse</strong>
        </div>
        <div className={this.props.isCreating ? styles.form : styles.hidden}>
          <div className={styles.fields}>
            <input
              name="title"
              className={styles.input}
              placeholder="Overskrift"
              value={this.state.title}
              onChange={this.onChange}
            />
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
            <textarea
              className={styles.inputField}
              name="content"
              style={{ minHeight: 100 }}
              placeholder="Tekst"
              value={this.state.content}
              onChange={this.onChange}
            />
            <input
              name="musclegroups"
              className={styles.input}
              placeholder="Muskelgrupper"
              value={this.state.musclegroups}
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
          <button
            className={
              this.checkValidPost() ? styles.button : styles.buttonDisabled
            }
            onClick={() => this.post()}
          >
            Post
          </button>
        </div>
      </div>
    );
  }
}
