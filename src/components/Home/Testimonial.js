import React from 'react';
import './Testimonial.css';

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

export default Testimonial;