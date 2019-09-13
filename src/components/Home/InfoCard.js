import React from 'react';
import './InfoCard.css';
import styled from 'styled-components';

const InfoCard = props => (
    <div className="InfoCard">
        <div className="InfoCard-img" style={{backgroundImage: `url('./img/${props.imageUrl}')`}}></div>
        <h3>{props.hed}</h3>
        <p>{props.dek}</p>
    </div>
);

export default styled(InfoCard)`
    .InfoCard {
        border: 1px solid blue;
    }

    .InfoCard-img {
        padding-top: 50%;
        width: 100%;
        border: 1px solid green;
        background-size: cover;
        background-position: center;
    }
`;