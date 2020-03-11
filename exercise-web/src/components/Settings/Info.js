import React from "react";
import styles from "./settings.module.css";

const Info = () => {
    return (
        <div className={styles.container}>
          <div className={styles.infoHeader}>
            <div className={styles.mainHeader}>Exercise-It!</div>
            <br />
            <p>En aktiv side for deg som ønsker å dele trening og bli inspirert</p>
            <p>Gruppe 62, Programvareutvikling</p>
            <p>NTNU Våren 2020</p>
          </div>
        </div>
    );
}

export default Info;
