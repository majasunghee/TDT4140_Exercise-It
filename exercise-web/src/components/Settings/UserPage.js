import React from "react";
import styles from "./settings.module.css";

const UserPage = props => {
  return (
    <div className={styles.container}>
      <div className={styles.infoHeader}>
        <div className={styles.mainHeader}>{props.username}</div>
        <br />
        <p>Her skal det inn mange treningsøkter for denne brukeren</p>
      </div>
    </div>
  );
};

export default UserPage;
