import React from 'react';
import Header from './Header';
import Slider from './Slider';
import InfoCard from './InfoCard';
import Testimonial from './Testimonial';
import styled from 'styled-components';

const Home = props => {
    return (
        <div className={props.className}>
            <Header {...props} />
            <h2>How it works</h2>
            {/* <Slider {...props} /> */}
            {/* <hr/> */}
            <div className="InfoCard-container">
                {props.infoCards.map((card, i) => <InfoCard key={`id${i}`} {...card} />)}
            </div>
            <div className="img-overlay">
                <h2>What are people saying about Prep'd Fresh?</h2>
            </div>
            <div className="Testimonial-container">
                {props.testimonials.map(t => <Testimonial key={t.id} {...t} />)}
            </div>
        </div>
    )
};

export default styled(Home)`
    hr {
        max-width: 90%;
    }

    h2 {
        text-align: center;
        color: #3E444B;
    }

    .img-overlay {
        height: 150px;
        background-image: linear-gradient(
            rgba(100, 100, 100, 0.45), 
            rgba(100, 100, 100, 0.45)
        ), url('./img/${props => props.testimonialHeadingImgUrl}');
        margin: 40px 0;
        text-align: center;
        background-size: cover;
        background-position: center;
        color: white;
        font-weight: normal;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 190px;
        & > h2 { 
            color: #FFF;
        }
    }

    .InfoCard-container {
        display: grid;
        margin: 20px;
        grid-row-gap: 40px;
    }

    .Testimonial-container {
        display: grid;
        margin: 80px 20px 20px 20px;
        grid-row-gap: 80px;
    }

    .Slider-wrapper {
        padding-top: 40%;
    }

    @media screen and (min-width: 1024px) {
        .Slider-wrapper {
            margin: 40px;
        }

        .InfoCard-container {
            grid-template: auto / 1fr 1fr 1fr;
            margin: 20px 40px;
            grid-column-gap: 40px;
        }

        .Testimonial-container {
            grid-template: auto / 1fr 1fr 1fr;
            margin: 80px 40px 20px 40px;
            grid-column-gap: 40px;
        }
    }
`;