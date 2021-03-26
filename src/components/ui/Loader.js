import React from 'react';
import reactibookLogo from '../../assets/carGarage.png';
import './ui-styles.css';

export const Loader = () => {
    return (
        <div className="spinner col-md-12">
            <div className="double-bounce1">
                <img src={ reactibookLogo } alt="Reactibook loaging..."/>
            </div>
            <div className="double-bounce2">
                <img src={ reactibookLogo } alt="Reactibook loaging..."/>
            </div>
        </div>
    )
}