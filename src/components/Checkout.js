import React from 'react';
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
    <div className="Checkout">
        <h2>Checkout</h2>
        <Cart />
        <div className="total">
            Total $22.97
        </div>
        <p>*Meals are delivered every Sunday. The next delivery date is Sunday, July 28. Order by 11:59pm Friday, July 26 to receive your delivery this Sunday.</p>
        <div className="Stripe">
            <input placeholder="Address" />
            <input placeholder="City" />
            <input placeholder="Province" />
            <input placeholder="Postal Code" />
            <input placeholder="Card number" />
            <input placeholder="Expiration" />
            <input placeholder="CVC" />
        </div>
        <button>Pay $22.97</button>
    </div>
);

export default Checkout;