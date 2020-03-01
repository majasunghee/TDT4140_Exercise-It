import React from 'react';
import styles from '../../App.module.css'

export default class NewMusclegroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { musclegroup: ''}
      }

    
  post = async () => {
      const formdata = new FormData();
      formdata.append("name", this.state.title);

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
      console.log("posting a new exercise..");
      this.props.reFetch();
      this.setState(defaultState);
      return data;
  };

    render() {
    if (!this.props.isCreating) {
        return <div></div>
    }
    return <div className={styles.postWrapperExtra}>
           <input
            name="musclegroup"
            className={this.state.musclegroup.length > 2 && 
                this.props.musclegroups.filter(a => a.name === this.state.musclegroup).length === 0 ? styles.inputMedium : styles.inputMediumDisabled}
            placeholder="Velg muskelgrupper"
            value={this.state.musclegroup.charAt(0).toUpperCase() + 
              this.state.musclegroup.slice(1)}
            onChange={change =>
                this.setState({ musclegroup: change.target.value })}
            onKeyPress={event =>
              event.key === "Enter" ? this.addFilter() : ""} />
               <button
          className={
            this.state.musclegroup.length > 2 && 
            this.props.musclegroups.filter(a => a.name === this.state.musclegroup).length === 0
             ? styles.buttonSmall : styles.buttonSmallDisabled
          }
          onClick={() => this.addFilter()}
        >
          Velg
        </button>
        </div> }
}
