import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import styled from 'styled-components';

const Header = props => (
    <header style={{backgroundImage: `url('/img/${props.heroImageUrl}')`}}>
        <h1>Student life made easy</h1>
        <Link to="/menu/">ORDER NOW</Link>&nbsp;
        <p>New menu weekly | No tax | Free delivery</p>
    </header>
);

export default styled(Header)`
    header {
        text-align: center;
        border: 1px solid blue;
        background-size: cover;
        background-position: center;
        color: white;
    }

    @media screen and (min-width: 1024px) {
        header {
            min-height: 100vh;
        }
    }
`;