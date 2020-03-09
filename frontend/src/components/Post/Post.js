import React from "react";
import styles from "../../App.module.css";
import anonym from "../../icons/anonym.png";
import professional from "../../icons/professional.png";
import amateur from "../../icons/amateur.png";

const months = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember"
];

const Post = props => {
  return (
    <div className={styles.postWrapper}>
      <img
        alt="Exercise-it!"
        className={styles.icon}
        src={
          props.user && props.user.username
            ? props.user.role
              ? professional
              : amateur
            : anonym
        }
      />
      <div className={styles.title}>
        <strong>{props.title}</strong>
        <div className={styles.subtitle}>
          <strong>{props.exercise ? "Øvelse" : "Treningsøkt"}</strong>
        </div>
      </div>
      <div className={styles.description}>
        {props.user ? "Av " + props.user.username : "Anonym"} -{" "}
        {parseInt(props.date.slice(8, 10), 10) +
          ". " +
          months[parseInt(props.date.slice(5, 7), 10) - 1]}
      </div>
      <div
        className={styles.postImage}
        style={{
          backgroundImage: "url(" + props.image.split("public/")[1] + ")"
        }}
      >
        <div className={styles.gradient} />
      </div>
      <div className={styles.text}>
        {props.content.slice(0, 210)}
        {props.content.length > 210 ? ".." : ""}
      </div>
      <div>
        <button className={styles.buttonVis}>
          Synlig
        </button>
      </div>
    </div>
  );
};

export default Post;
