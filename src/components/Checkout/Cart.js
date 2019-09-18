import React from 'react';
import CartItem from './CartItem';
import styled from 'styled-components';

const Cart = ({className, cartItems}) => (
    <div className={"Cart " + className}>
        {Object.keys(cartItems)
                .sort()
                .map(itemId => (
                    <CartItem 
                        key={itemId} 
                        cartItem={cartItems[itemId]} />
                ))}
    </div>
);

export default styled(Cart)`
    & {
        border: 1px solid green;
        padding: 0 10px;
        background-color: #FFF;
        border-radius: 5px;
        border: none;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    }
`;