import React from 'react';
import styles from '../../App.module.css'
import './spinner.scss'

const Spinner = () => {
    return (
        <div className={styles.postWrapper}>
        <div className={styles.loadingTitle}>
            <strong>Laster inn..</strong>
            <div className="spinner">
            <div className="outer">
                <div className="body">
                    <div className="arm behind"/>
                    <div className="arm front"/>
                    <div className="leg behind"/>
                    <div className="leg front"/>
                </div>
            </div>
        </div></div>
        <div>Vennligst vent</div>
        <div className={styles.postImage} style={{ backgroundImage: ""}}>
        <div className={styles.gradientLoading}/>
        </div>
        <div>...</div>
      </div>
   )
}

export default Spinner;