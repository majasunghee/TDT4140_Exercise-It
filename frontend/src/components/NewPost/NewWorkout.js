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
        formdata.append('relations', this.state.exercises);
        formdata.append('username', this.props.user.username ? this.props.user.username : '')
    
        var parameters = {
          method: "POST",
          body: formdata,
          redirect: "follow"
        };
        const response = await fetch("http://localhost:8000/workouts/", parameters);
        const data = await response.json();
        console.log("posting a new workout..");
        this.props.reFetch();
        this.setState(defaultState)
        return data;
      }
      else {this.setState({error: true})}
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
        
        render() {
        if ( !this.props.isCreating ) { return <div></div>}

        return (            
          <div className={styles.postWrapperPublish}>
          <div className={styles.title}>
              <strong>Opprett treningsøkt</strong>
            </div>
            <div >
              
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



        <div className={styles.postImagePublish} >
        <div className={styles.gradientPublish}>
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
                  </div> </div> </div>
                <textarea
                  className={styles.inputField}
                  name="content"
                  style={{ minHeight: 100 }}
                  placeholder="Beskrivelse"
                  value={this.state.content}
                  onChange={this.onChange}
                />
                <input
                  name="exercises"
                  className={styles.input}
                  placeholder="Velg øvelser"
                  value={this.state.exercises}
                  onChange={this.onChange}
                />
              <button
                className={
                  this.checkValidPost()
                    ? styles.button
                    : styles.buttonDisabled
                }
                onClick={() => this.post()}
              >
                + Publiser
              </button>
            </div>
          </div>) }
    }