import React from "react";
import styles from "./settings.module.css";


const UserPage = props => {
  return (
    <div className={styles.container}>
      <div className={styles.infoHeader}>
        <div className={styles.UserContainer}>
          <div className={styles.PB_frame}>
            +
          </div>
          <div className={styles.personalia}>
          <p id={styles.Name}>Aleksander</p>
            <p>Profesjonell</p>
          </div>
          <div className={styles.statWrapper}>
            <div> 
              <p id={styles.stat}>154</p>
              <p id={styles.Hstat}>Innlegg</p>
            </div>
            <div>
              <p id={styles.stat}>14</p>
              <p id={styles.Hstat}>Mål fullført</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserPage;
