import React from "react";
import styles from "../../App.module.css";

const Card = props => {
  return (
    <div className={styles.cardWrapper} style={{  
      backgroundImage: "url("+props.image.split('public/')[1]+")",
    }}>
      <div className={styles.title}>
        <strong>{props.title}</strong> <div className={styles.subtitle}>
        <strong>Øvelse</strong>
      </div>
      </div>
     
    </div>
  );
};

export default Card;
