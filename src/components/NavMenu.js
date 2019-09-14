import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCartVisibility } from '../actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faCarrot, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import logo from "../cropped-color_logo_transparent.png";

const NavMenu = props => {
    const dispatch = useDispatch();
    const handleCheckoutPanelToggle = () => dispatch(toggleCartVisibility());
    return (
        <div className={props.className}>
            <Link to="/">
                <img className="logo" alt="logo" src={logo} />
            </Link>&nbsp;
            <Link to="/menu/">
                {/* <FontAwesomeIcon icon={faCarrot} size="lg" color="#F8951D" />             */}
                <FontAwesomeIcon icon={faBookOpen} size="lg" color="#F8951D" />            
            </Link>&nbsp;
            <button onClick={handleCheckoutPanelToggle}>
                <FontAwesomeIcon icon={faShoppingCart} size="lg" color="#F8951D" />
            </button>
        </div>
    );
}

export default styled(NavMenu)`
    height: 40px;
    display: flex;
    justify-content: space-between;
    color: #F8951D;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #FFFFFF;
    z-index: 2;
    & > * {
        margin: 10px;
    }
    & .logo {
        width: 30px;
    }
`;