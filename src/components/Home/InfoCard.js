import React from 'react';
import './InfoCard.css';

const InfoCard = props => (
    <div className="InfoCard">
        <div className="InfoCard-img" style={{backgroundImage: `url('./img/${props.imageUrl}')`}}></div>
        <h3>{props.hed}</h3>
        <p>{props.dek}</p>
    </div>
);

export default InfoCard;