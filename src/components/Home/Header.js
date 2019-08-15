import React from 'react';
import './Header.css';

const Header = props => (
    <header style={{backgroundImage: `url('/img/${props.heroImageUrl}')`}}>
        <h1>Student life made easy</h1>
        <button>ORDER NOW</button>
        <p>New menu weekly | No tax | Free delivery</p>
    </header>
);

export default Header;