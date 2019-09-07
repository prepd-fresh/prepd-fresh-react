import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCartVisibility } from '../actions';
import { Link } from 'react-router-dom';

const NavMenu = () => {
    const dispatch = useDispatch();
    const handleCheckoutPanelToggle = () => dispatch(toggleCartVisibility());
    return (
        <div className="NavMenu">
            <Link to="/">Home</Link>&nbsp;
            <Link to="/menu/">Menu</Link>&nbsp;
            <button onClick={handleCheckoutPanelToggle}>Checkout</button>
        </div>
    );
}

export default NavMenu;