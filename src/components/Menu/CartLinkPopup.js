import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const CartLinkPopup = ({qtyOfItems, total, className, openCart, ...props}) => (
    <div className={className} onClick={openCart}>
        <div>
            {`${qtyOfItems} ${(qtyOfItems > 1) ? 'items' : 'item'} | $${total}`}
        </div>
        <div>
            View Cart&nbsp;&nbsp;
            <FontAwesomeIcon icon={faShoppingCart} size="1x" color="#FFF"/>
        </div>
    </div>
);

export default styled(CartLinkPopup)`
    background-color: #23B47E;
    border-radius: 5px;
    padding: 20px 30px;
    color: #FFF;
    width: 400px;
    max-width: 90%;
    margin: auto;
    left: 0;
    right: 0;
    position: fixed;
    bottom: 20px;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
`;