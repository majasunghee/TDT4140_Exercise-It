import React from 'react';
import './spinner.scss'

const Spinner = () => {
    return (<div>
               <div className="text">Laster..</div>
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
 
    </div>)
}

export default Spinner;