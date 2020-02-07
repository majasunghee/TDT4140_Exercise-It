import React from "react";
import styles from "./App.module.css";

const Card = props => {
  return (
    <div className={styles.cardWrapper} style={{  
      backgroundImage: "url(" + props.bilde + ")",
    }}>
      <div className={styles.title}>
        <strong>{props.tittel}</strong>
      </div>
      <div>
        Brukernavn {props.user}
      </div>
    </div>
  );
};

export default Card;
