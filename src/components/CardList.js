import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function CardList(props) {

    return (
        <div className="card-list">
            <div className="card-container">
                <Link to="/location" className="card-link">
                    <div className="single-card-box">
                        <div className="card-text">
                            <h2 className="card-title">{props.loc_name}</h2>
                            <h2 className="card-city">{props.city}</h2>
                            <h2 className='card-zipcode'>{props.ZIPCODE}</h2>
                            <h2 className='card-basin-name'>{props.BASIN_NAME}</h2>
                        </div>
                        <div className="card-image-box">
                            <img src="img/empty.png" alt="test image" className="card-image" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
