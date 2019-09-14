import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = props => (
    <header 
        className={props.className} >
        <h1>Student life made easy</h1>
        <Link to="/meals/">ORDER NOW</Link>&nbsp;
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
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    & h1 {
        font-family: Roboto;
        font-weight: normal;
        font-size: 22px;
        color: #FFF;
    }

    & > a {
        line-height: 35px;
        background-color: #F8951D;
        width: 110px;
        border-radius: 4px;
        color: #FFF;
        text-decoration: none;
        font-size: 12px;
    }

    & > p {
        margin: 10px 0;
        font-size: 14px;
        color: #FFF;
    }

    @media screen and (min-width: 1024px) {
        header {
            min-height: 100vh;
        }
    }
`;