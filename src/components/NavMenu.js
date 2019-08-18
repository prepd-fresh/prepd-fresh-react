import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu = ({handleCheckoutPanelToggle}) => (
    <div className="NavMenu">
        <Link to="/">Home</Link>&nbsp;
        <Link to="/menu/">Menu</Link>&nbsp;
        <button onClick={handleCheckoutPanelToggle}>Checkout</button>
    </div>
);

export default NavMenu;