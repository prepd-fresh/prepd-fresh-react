import React from 'react';
import './Home.css';
import Header from './Header';
import Slider from './Slider';
import InfoCard from './InfoCard';
import Testimonial from './Testimonial';

const Home = () => (
    <div className="Home">
        <Header />
        <Slider />
        <hr/>
        <div className="InfoCard-container">
            <InfoCard />
            <InfoCard />
            <InfoCard />
        </div>
        <div className="img-overlay">
            <h2>What are people saying about Prep'd Fresh?</h2>
        </div>
        <div className="Testimonial-container">
            <Testimonial />
            <Testimonial />
            <Testimonial />
        </div>
    </div>
);

export default Home;