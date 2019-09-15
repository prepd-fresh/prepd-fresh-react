import React from 'react';
import styled from 'styled-components';

const Testimonial = props => {

    const style = {backgroundImage: `url('./img/${props.imageUrl}')`};
    return (
        <div className={props.className}>
            <div className="Testimonial-img" style={style} />
            <h3>{props.name}</h3>
            <blockquote>{props.quote}</blockquote>
        </div>
    );
};

export default styled(Testimonial)`

    text-align: center;
    background-color: #FFF;
    border-radius: 5px;
    margin: 10px;
    position: relative;
    z-index: 1;
    padding-top: 50px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    blockquote {
        position: relative;
    }
    blockquote::before, blockquote::after {
        font-family: georgia;
        color: rgba(229, 134, 50, 0.24);
        font-size: 90px;
        position: absolute;
    }
    blockquote::before {
        content: "“";
        top: -30px;
        left: -30px;
    }
    blockquote::after {
        content: "”";
        bottom: -60px;
        right: -30px;
    }
    .Testimonial-img {
        width: 100px;
        height: 100px;
        background-size: cover;
        background-position: center;
        border-radius: 50%;
        margin: auto;
        position: absolute;
        top: -50px;
        left: 50%;
        margin-left: -50px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    }
    @media screen and (min-width: 768px) {
        flex: 1 1 30%;
    }
`;