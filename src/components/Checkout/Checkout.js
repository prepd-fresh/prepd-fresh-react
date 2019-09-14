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
            <div className={"Checkout " +
                            (cartIsVisible 
                                ? "slide-in " 
                                : "slide-out ") 
                            + className}>
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

    && {
        width: 320px;
        box-sizing: border-box;
        padding: 60px 20px 20px 20px;
        position: fixed;
        transform: translateX(100%);
        top: 0;
        right: 0;
        background-color: #FAF8F4;
        height: 100%;
    }
    &.slide-in {
        animation: slide-in 0.25s forwards;
    }

    &.slide-out {
        animation: slide-out 0.25s forwards;
    }

    @keyframes slide-in {
        100% {
            transform: translateX(0%)
        }
    }

    @keyframes slide-out {
        0% {
            transform: translateX(0%)
        }
        100% {
            transform: translateX(100%)
        }
    }

    & h2 {
        margin-top: 0;
    }

    .total {
        margin-top: 15px;
        padding: 10px;
        background-color: #FFF;
        border-radius: 5px;
        border: none;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    }

    @media screen and (min-width: 1024px) {
        /* show delete buttons instead of slideable cart items */
    }
`;