import React from 'react';
import './Home.css';
import Header from './Header';
import Slider from './Slider';
import InfoCard from './InfoCard';
import Testimonial from './Testimonial';

const Home = props => {
    const style = {backgroundImage: `url('./img/${props.testimonialHeadingImgUrl}')`};
    return (
        <div className="Home">
            <Header {...props} />
            <Slider {...props} />
            <hr/>
            <div className="InfoCard-container">
                {props.infoCards.map((card, i) => <InfoCard key={`id${i}`} {...card} />)}
            </div>
            <div className="img-overlay" style={style}>
                <h2>What are people saying about Prep'd Fresh?</h2>
            </div>
            <div className="Testimonial-container">
                {props.testimonials.map(t => <Testimonial key={t.id} {...t} />)}
            </div>
        </div>
    )
};

export default Home;