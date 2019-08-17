import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu = () => (
    <div className="NavMenu">
        <Link to="/">Home</Link>&nbsp;
        <Link to="/menu/">Menu</Link>&nbsp;
        <Link to="/checkout/">Checkout (Test Link)</Link>
    </div>
);

export default NavMenu;