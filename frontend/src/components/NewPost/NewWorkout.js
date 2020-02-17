import React from "react";
import styles from "../../App.module.css"

const defaultState = {
  title: "",
  exercises: [],
  image: "",
  content: "",
  duration: "",
  error: false
}

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
        formdata.append('title', this.state.title);
        formdata.append('date', dateFormat);
        formdata.append('content', this.state.content);
        formdata.append('duration', this.state.duration);
        formdata.append('image', this.state.image, this.state.image.name);
        formdata.append('exercises', this.state.exercises);
    
        var parameters = {
          method: "POST",
          body: formdata,
          redirect: "follow"
        };
        const response = await fetch("http://localhost:8000/workouts/", parameters);
        const data = await response.json();
        console.log("posting a new workout..");
        this.props.reFetch();
        this.props.createNew();
        this.setState(defaultState)
        return data;
      }
      else {this.setState({error: true})}
      };

      checkValidPost = () => {
        return (
            this.state.title.length > 3 &&
            this.state.image &&
            this.state.content.length > 20 &&
            this.state.duration
        );
        };
    
        onChange = change =>
        this.setState({ [change.target.name]: change.target.value });
        
        render() { 
        return (            
        <div
            onClick={() =>
              !this.props.isCreating && this.props.createNew()
            }
            className={
              this.props.isCreating ? styles.newPost : styles.triggerPost
            }
          >
            <div>
              <strong>Opprett treningsøkt</strong>
            </div>
            <div
              className={this.props.isCreating ? styles.form : styles.hidden}
            >
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
                 <input type="file"
                 name="image"
                 accept="image/png, image/jpeg"
                 onChange={change => {
                  this.setState({
                    image: change.target.files[0]
                  });
                }}/>
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
                  name="exercises"
                  className={styles.input}
                  placeholder="Øvelser"
                  value={this.state.exercises}
                  onChange={this.onChange}
                />
                 <input
                  name="duration"
                  type="number"
                  className={styles.input}
                  placeholder="Varighet"
                  value={this.state.duration}
                  onChange={this.onChange}
                />
              </div>
              <button
                className={
                  this.checkValidPost()
                    ? styles.button
                    : styles.buttonDisabled
                }
                onClick={() => this.post()}
              >
                Post
              </button>
            </div>
          </div>) }
    }