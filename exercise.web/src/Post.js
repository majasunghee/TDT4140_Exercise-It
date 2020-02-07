import React from "react";
import styles from "./App.module.css";

const Post = props => {
  return (
    <div className={styles.postWrapper}>
      <div className={styles.title}>
        <strong>{props.tittel}</strong>
        <div className={styles.subtitle}><strong>Treningsøkt</strong></div>
      </div>
      <div>
        Av {props.user} - {props.dato}
      </div>
      <img src={props.bilde} alt="Bilde"></img>
      <div>{props.beskrivelse.slice(0, 80)}..</div>
    </div>
  );
};

export default Post;
