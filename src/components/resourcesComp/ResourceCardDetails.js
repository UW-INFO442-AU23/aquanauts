import React, { useState } from 'react';
import NavBar from '../NavBar.js';
import { NavLink } from 'react-router-dom';

export default function ResourceCardDetails(props) {
    const cardDetails = props.details;
    const { LOC_NAME } = props.match.params;

    return (
        <div className="details-container">
            <NavBar />
            <div className="location-back-button">
                <button className="back-button"><NavLink to="/resources">Back</NavLink></button>
            </div>
            <div className="location-name-text">
                <h1 className="name-of-location">{props.LOC_NAME}</h1>
            </div>
            <div className="details-image-box">
                <h2>{cardDetails.LOC_NAME}</h2>
                <h2>{cardDetails.LOC_TYPE}</h2>
                <h2>{cardDetails.CITY}</h2>
            </div>
        </div>
    )
}