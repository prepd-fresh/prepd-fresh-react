import React from 'react';
import Header from './Header';
import Slider from './Slider';
import InfoCard from './InfoCard';
import Testimonial from './Testimonial';
import styled from 'styled-components';

const Home = props => {
    return (
        <React.Fragment>
            <Header {...props} />
            <div className={props.className}>
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
        </React.Fragment>
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
        width: 100%;
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
        display: flex;
        flex-direction: column;
        margin: 20px auto;
        flex-wrap: wrap;
        max-width: 400px;
    }

    .Testimonial-container {
        display: flex;
        margin: 80px auto 20px auto;
        flex-direction: column;
        flex-wrap: wrap;
        max-width: 400px;
    }

    .Slider-wrapper {
        padding-top: 40%;
    }

    @media screen and (min-width: 768px) {
        .Slider-wrapper {
            margin: 40px;
        }

        .InfoCard-container {
            flex-direction: row;
            margin: 20px auto;
            max-width: 1024px;
        }

        .Testimonial-container {
            flex-direction: row;
            max-width: 1024px;
            margin: 80px auto;
        }
        .img-overlay h2 {
            padding: 0 25%;
            font-size: 34px;
            font-weight: 400;
        }
    }
`;