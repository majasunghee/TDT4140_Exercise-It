import React from "react";
import styles from "./App.module.css";

const PostContainer = props => {
  return (
    <div>
      <div className={styles.singlePostWrapper}>
        <div className={styles.title}>
          <strong>{props.post.tittel}</strong>
        </div>
        <div>
          Brukernavn {props.post.user} - {props.post.dato}
        </div>
        <img src={props.post.bilde} alt="Bilde"></img>
        <div>{props.post.beskrivelse}</div>
      </div>
      <div className={styles.kommentarer}>
        <strong>Kommentar</strong>
        <div>
          <input placeholder="Skriv her" className={styles.inputField} />{" "}
          <button className={styles.button}>Send inn</button>{" "}
        </div>
        {props.post.kommentarer &&
          props.post.kommentarer.map(a => (
            <div className={styles.kommentar}>
              <strong>Brukernavn {a.userId}</strong> - {a.kommentar}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostContainer;
