import React from "react";
import Post from "./Post";
import Card from "./Card";
import styles from "./App.module.css";

import { testØkter, testØvelser } from "./testConsts.js";

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //state for at feeden skal fungere
      øvelser: testØvelser,
      økter: testØkter,
      userId: this.props.name,
      filters: [],
      valgteMuskler: [],
      valgteØvelser: [],
      //state for evt. ny treningsøkt
      newTitle: "",
      newØvelser: [],
      newImg: "",
      newText: "",
      kommentarer: []
      //state for evt. ny øvelse
    };
  }

  componentDidMount() {
    this.getmuskler();
  }

  getmuskler(newmuskler) {
    var temp = newmuskler ? newmuskler : [];
    this.state.øvelser.forEach(a => (temp = [...temp, ...a.muskler]));
    this.setState({
      filters: temp.filter(function(item, pos) {
        return temp.indexOf(item) === pos;
      })
    });
  }

  checkChoosenmuskler = post => {
    var alleØvelser = [];
    var alleMuskler = [];
    var match = 0;
    post.øvelser.forEach(a => alleØvelser.push(a));
    alleØvelser.forEach(a =>
      this.state.øvelser[Number.parseInt(a, 10)]
        ? (alleMuskler = [
            ...alleMuskler,
            ...this.state.øvelser[Number.parseInt(a, 10)].muskler
          ])
        : ""
    );
    alleMuskler.forEach(a =>
      this.state.valgteMuskler.includes(a) ? (match = match + 1) : ""
    );
    return match === this.state.valgteMuskler.length;
  };

  checkValidPost = () => {
    return (
      this.state.newTitle.length > 3 &&
      this.state.newImg.length > 3 &&
      this.state.newText.length > 3
    );
  };

  createNewPost() {
    var date = new Date();
    var dateFormat =
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    var post = {
      userId: this.state.userId,
      dato: dateFormat,
      tittel: this.state.newTitle,
      øvelser: this.state.newØvelser.split(" "),
      bilde: this.state.newImg,
      beskrivelse: this.state.newText
    };
    this.setState(prev => ({
      økter: [post, ...prev.økter]
    }));
    this.setState({
      newTitle: "",
      newImg: "",
      newØvelser: "",
      newText: ""
    });
    this.getmuskler(post.muskler);
  }

  render() {
    return (
      <div>
        <div className={styles.feedContainer}>
          <div className={styles.feed}>
            <div
              onClick={() =>
                !this.props.publishing && this.props.onPublishing()
              }
              className={
                this.props.publishing ? styles.newPost : styles.triggerPost
              }
            >
              <div>
                <strong>Lag ny treningsøkt</strong>
              </div>
              <div
                className={this.props.publishing ? styles.form : styles.hidden}
              >
                <div className={styles.fields}>
                  <input
                    className={styles.input}
                    placeholder="Overskrift"
                    value={this.state.newTitle}
                    onChange={change => {
                      this.setState({
                        newTitle: change.target.value
                      });
                    }}
                  />
                  <input
                    className={styles.input}
                    placeholder="Bilde"
                    value={this.state.newImg}
                    onChange={change => {
                      this.setState({
                        newImg: change.target.value
                      });
                    }}
                  />
                  <input
                    className={styles.inputField}
                    placeholder="Tekst"
                    value={this.state.newText}
                    onChange={change => {
                      this.setState({
                        newText: change.target.value
                      });
                    }}
                  />
                  <input
                    className={styles.inputField}
                    placeholder="Øvelser"
                    value={this.state.newØvelser}
                    onChange={change => {
                      this.setState({
                        newØvelser: change.target.value
                      });
                    }}
                  />
                </div>
                <button
                  className={
                    this.checkValidPost()
                      ? styles.button
                      : styles.buttonDisabled
                  }
                  onClick={() => this.checkValidPost() && this.createNewPost()}
                >
                  Post
                </button>
              </div>
            </div>
            {this.state.valgteMuskler.length === 0
              ? this.state.økter.slice(0, 3).map(post => (
                  <div onClick={() => this.props.singlePost(post)}>
                    <Post
                      user={post.userId}
                      dato={post.dato}
                      tittel={post.tittel}
                      bilde={post.bilde}
                      beskrivelse={post.beskrivelse}
                    />
                  </div>
                ))
              : this.state.økter.map(post =>
                  this.checkChoosenmuskler(post) ? (
                    <div onClick={() => this.props.singlePost(post)}>
                      <Post
                        user={post.userId}
                        dato={post.dato}
                        tittel={post.tittel}
                        bilde={post.bilde}
                        beskrivelse={post.beskrivelse}
                      />{" "}
                    </div>
                  ) : (
                    ""
                  )
                )}
          </div>
          <div className={styles.filter}>
            <h3>
              <strong>Sorter på muskelgrupper</strong>
            </h3>
            <br />
            {this.state.filters.map(tag => (
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
                {tag}
              </div>
            ))}
            <h3>
              <strong>Sorter på øvelser</strong>
            </h3>
            {this.state.øvelser.map(øvelse => (
              <div
                onClick={() =>
                  this.state.valgteØvelser.includes(øvelse.tittel)
                    ? this.setState({
                        valgteØvelser: this.state.valgteØvelser.filter(
                          a => a !== øvelse.tittel
                        )
                      })
                    : this.setState(prev => ({
                        valgteØvelser: [...prev.valgteØvelser, øvelse.tittel]
                      }))
                }
                className={
                  this.state.valgteØvelser.includes(øvelse.tittel)
                    ? styles.choosenLink
                    : styles.filterLink
                }
              >
                {øvelse.tittel}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.feedContainer}>
          <div className={styles.feed}>
            {this.state.valgteMuskler.length === 0 ? (
              <div>
                <div className={styles.cardContainer}>
                  {this.state.øvelser.slice(0, 5).map(øvelse => (
                    <div onClick={() => {}}>
                      <Card
                        user={øvelse.userId}
                        dato={øvelse.dato}
                        tittel={øvelse.tittel}
                        bilde={øvelse.bilde}
                        beskrivelse={øvelse.beskrivelse}
                      />
                    </div>
                  ))}
                </div>
                {this.state.økter.slice(3).map(post => (
                  <div onClick={() => this.props.singlePost(post)}>
                    <Post
                      user={post.userId}
                      dato={post.dato}
                      tittel={post.tittel}
                      bilde={post.bilde}
                      beskrivelse={post.beskrivelse}
                    />
                  </div>
                ))}{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
