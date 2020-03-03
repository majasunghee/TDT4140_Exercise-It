import React from 'react';
import styles from '../../App.module.css'
import './spinner.scss'

const Spinner = () => {
    return (
        <div className={styles.spinnerContainer}>
            <div className="spinner">
            <div className="outer">
                <div className="body">
                    <div className="arm behind"/>
                    <div className="arm front"/>
                    <div className="leg behind"/>
                    <div className="leg front"/>
                </div>
            </div>
        </div>
        </div>
   )
}

export default Spinner;