import React from 'react';

const Header = () => (
    <header>
        <h1>Student life made easy</h1>
        <button>ORDER NOW</button>
        <p>New menu weekly | No tax | Free delivery</p>
    </header>
);

const Slider = () => (
    <div className="Slider">
        <h2>How it works</h2>
        <div className="slider-wrapper">Slider goes here</div>
    </div>
);

const InfoCard = () => (
    <div className="InfoCard">
        <div className="InfoCard-img" />
        <h3>A menu that updates every week</h3>
        <p>Every week features a fresh menu, to keep your tastebuds happy!</p>
    </div>
);

const Testimonial = () => (
    <div className="Testimonial">
        <div className="Testimonial-img" />
        <h3>Firstname L.</h3>
        <blockquote>
        This space is reserved for a quote from one of our users!
        </blockquote>
    </div>
);

const Home = () => (
    <div className="Home">
        <Header />
        <Slider />
        <hr/>
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <div className="img-overlay">
        <h2>What are people saying about Prep'd Fresh?</h2>
        </div>
        <Testimonial />
        <Testimonial />
        <Testimonial />
    </div>
);

export default Home;