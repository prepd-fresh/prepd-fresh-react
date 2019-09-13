import React from 'react';
import styled from 'styled-components';

const Testimonial = props => {

    const style = {backgroundImage: `url('./img/${props.imageUrl}')`};
    return (
        <div className="Testimonial">
            <div className="Testimonial-img" style={style} />
            <h3>{props.name}</h3>
            <blockquote>{props.quote}</blockquote>
        </div>
    );
};

export default styled(Testimonial)`
    .Testimonial {
        text-align: center;
        border: 1px solid blue;
        /* margin: 70px 20px 20px 20px; */
        position: relative;
        z-index: 1;
        padding-top: 50px;
    }

    .Testimonial-img {
        width: 100px;
        height: 100px;
        border: 1px solid green;
        background-size: cover;
        background-position: center;
        border-radius: 50%;
        margin: auto;
        position: absolute;
        top: -50px;
        left: 50%;
        margin-left: -50px;
    }
`;