import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import './Checkout.css';

const CartItem = () => (
    <div className="CartItem">
        <div className="item-name-and-size">
            <h4>Salmon w/ Rice, Potatoes, &amp; ...</h4>
            <p>Large</p>
        </div>
        <p>$7.99</p>
        <div className="delete-btn">
            <button>X</button>
        </div>
    </div>
);

const Cart = () => (
    <div className="Cart">
        <CartItem />
        <CartItem />
        <CartItem />
    </div>
);

const Checkout = () => (
    // This is the test private for Dustin's Stripe account. TODO: Change to Ben's
    <StripeProvider apiKey="pk_test_dxJRiJo1wDpI8NWpKyTy9WII00GF5Wl5rQ">
        <div className="Checkout">
            <h2>Checkout</h2>
            <Cart />
            <div className="total">
                Total $22.97
            </div>
            <p>*Meals are delivered every Sunday. The next delivery date is Sunday, July 28. Order by 11:59pm Friday, July 26 to receive your delivery this Sunday.</p>
            {false && <div className="Stripe">
                <input placeholder="Address" />
                <input placeholder="City" />
                <input placeholder="Province" />
                <input placeholder="Postal Code" />
                <input placeholder="Card number" />
                <input placeholder="Expiration" />
                <input placeholder="CVC" />
            </div>}
            <Elements>
                <CheckoutForm />
            </Elements>
        </div>
    </StripeProvider>
);

export default Checkout;