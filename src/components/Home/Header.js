import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = props => (
    <header style={{backgroundImage: `url('/img/${props.heroImageUrl}')`}}>
        <h1>Student life made easy</h1>
        <Link to="/menu/">ORDER NOW</Link>&nbsp;
        <p>New menu weekly | No tax | Free delivery</p>
    </header>
);

export default Header;