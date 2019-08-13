import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu = () => (
    <div className="NavMenu">
        <Link to="/">Home</Link>&nbsp;
        <Link to="/menu/">Menu</Link>
    </div>
);

export default NavMenu;