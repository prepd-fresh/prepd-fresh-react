import React from 'react';
import styled from 'styled-components';

const Slider = props => {
    const style = {backgroundImage: `url('./img/${props.sliderImgUrl}')`};

    return (
        <div className={props.className}>
            <h2>How it works</h2>
            <div className="Slider-wrapper" style={style}>Slider goes here</div>
        </div>
    );
};

export default styled(Slider)`
    .Slider-wrapper {
        background-size: cover;
        background-position: center;
    }
`;