import React from 'react';
import { useSelector } from 'react-redux';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import styled from 'styled-components';
import Cart from './Cart';

const Checkout = ({cartIsVisible, className}) => {
    const cartItems = useSelector(state => ({...state.cart}))
    const totalPrice = Object.keys(cartItems).reduce(
        (total, itemId) => (
            ((cartItems[itemId].itemPrice * 100 * cartItems[itemId].qty) + (total * 100)) / 100
        ),
        0
    )
    return (
        // This is the test private for Dustin's Stripe account. TODO: Change to Ben's
        <StripeProvider apiKey="pk_test_dxJRiJo1wDpI8NWpKyTy9WII00GF5Wl5rQ">
            <div className={className} 
                 style={{display: cartIsVisible ? "block" : "none"}}>
                <h2>Checkout</h2>
                <Cart cartItems={cartItems} />
                <div className="total">
                    Total ${totalPrice.toFixed(2)}
                </div>
                <p>*Meals are delivered every Sunday. The next delivery date is Sunday, July 28. Order by 11:59pm Friday, July 26 to receive your delivery this Sunday.</p>
                <Elements>
                    <CheckoutForm 
                        cartItems={cartItems} 
                        totalPrice={totalPrice} />
                </Elements>
            </div>
        </StripeProvider>
    );
}

export default styled(Checkout)`
    & {
        width: 320px;
        border: 1px solid blue;
        box-sizing: border-box;
        padding: 20px;
        position: absolute;
        top: 0;
        right: 0;
        background-color: #FAF8F4;
        height: 100%;
    }

    & h2 {
        margin-top: 0;
    }

    .Cart {
        border: 1px solid green;
        padding: 0 10px;
    }

    .CartItem {
        display: grid;
        grid-template: 30px / 4fr 1fr 1fr; 
        padding: 10px;
        border-bottom: 1px solid gray;
    }

    .CartItem:last-child {
        display: grid;
        grid-template: 30px / 4fr 1fr 1fr; 
        padding: 10px;
        border-bottom: none;
    }

    .CartItem .delete-btn {
        text-align: right;
    }

    .CartItem h4,
    .CartItem p {
        font-size: 9px;
    }

    .CartItem .item-name-and-size h4 {
        margin: 0;
    }

    .CartItem .item-name-and-size p {
        font-size: 11px;
        margin: 0;
    }

    .total {
        border: 1px solid green;
        margin-top: 15px;
        padding: 10px;
    }

    @media screen and (min-width: 1024px) {
        /* show delete buttons instead of slideable cart items */
    }
`;