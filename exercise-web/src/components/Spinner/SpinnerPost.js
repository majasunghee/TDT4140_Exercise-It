import React from 'react';
import './spinner.scss'

const SpinnerPost = () => {
    return (
        <div className="postWrapperSpinner">
        <div className="loadingTitle">
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
        <div className="postImage">
        <div className="gradientLoading"/>
        </div>
        <div>...</div>
      </div>
   )
}

export default SpinnerPost;