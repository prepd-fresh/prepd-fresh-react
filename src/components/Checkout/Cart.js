import React from 'react';
import CartItem from './CartItem';

const Cart = ({cartItems}) => (
    <div className="Cart">
        {Object.keys(cartItems)
                .map(itemId => (
                    <CartItem 
                        key={itemId} 
                        cartItem={cartItems[itemId]} />
                ))}
    </div>
);

export default Cart;