import React from 'react';
import styled from 'styled-components';

const InfoCard = props => (
    <div className={props.className}>
        <div className="InfoCard-img" style={{backgroundImage: `url('./img/${props.imageUrl}')`}}></div>
        <h3>{props.hed}</h3>
        <p>{props.dek}</p>
    </div>
);

export default styled(InfoCard)`


    .InfoCard-img {
        padding-top: 58%;
        width: 100%;
        border-radius: 5px;
        background-size: cover;
        background-position: center;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    }

    h3 {
        font-weight: 400;
        padding: 0;
        margin: 10px 0;
        color: #3E444B;
    }

    p {
        font-size: 14px;
        padding: 0;
        margin: 10px 0;
        color: #3E444B;
    }
`;