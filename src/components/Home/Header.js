import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = props => (
    <header 
        className={props.className} >
        <div className="header-centered">
            <h1>Student life made easy</h1>
            <Link to="/meals/">ORDER NOW</Link>&nbsp;
        </div>
        <p>New menu weekly | No tax | Free delivery</p>
    </header>
);

export default styled(Header)`

    
    text-align: center;
    background: linear-gradient(
    rgba(100, 100, 100, 0.45), 
    rgba(100, 100, 100, 0.45)
    ), url('/img/${props => props.heroImageUrl}');
    background-size: cover;
    background-position: center;
    color: white;
    height: 210px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    
    
    .header-centered {
        flex: 1 1 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    
    h1 {
        font-family: Roboto;
        font-weight: normal;
        font-size: 22px;
        color: #FFF;
    }

    a {
        line-height: 35px;
        background-color: #F8951D;
        width: 110px;
        border-radius: 4px;
        color: #FFF;
        text-decoration: none;
        font-size: 12px;
    }

    p {
        font-size: 14px;
        color: #FFF;
        ${'' /* flex: 0 0 auto; */}
    }

    @media screen and (min-width: 768px) {
        min-height: 400px;
        h1 {
            font-size: 42px;
        }
        p {
            font-size: 24px;
            margin: 10px;
        }
    }

    @media screen and (min-width: 1024px) {
        ${'' /* height: calc(100vh - 40px); */}
    }
`;