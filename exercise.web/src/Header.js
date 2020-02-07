import React from "react";
import styles from "./App.module.css";
import Logo from "./logo.png";
// import Profil from "./profile.png";
// import Timeplan from "./timeplan.png";

const Header = props => {
  return (
    <div className={styles.appHeader}>
      <div onClick={() => props.goHome()} className={styles.shiny}>
        <img alt="Exercise-it!" className={styles.logo} src={Logo} />
        <div className={styles.showoff} />
      </div>
      <div>
        {props.name ? (
          <div className={styles.userText}>
            Hei {props.name[0].toUpperCase() + props.name.slice(1)}!
          </div>
        ) : (
          ""
        )}
        <div className={styles.ButtonRow}>
          <div
            onClick={() => props.toggleTheme()}
            className={styles.headerButton}
          >
            {props.light ? "Mørkt tema" : "Lyst tema"}
          </div>
          <div onClick={() => props.logout()} className={styles.headerButton}>
            Logg ut
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
