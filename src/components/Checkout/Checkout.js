import React from 'react';
import { useSelector } from 'react-redux';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import './Checkout.css';
import Cart from './Cart';

const Checkout = () => {
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
            <div className="Checkout">
                <h2>Checkout</h2>
                <Cart cartItems={cartItems} />
                <div className="total">
                    Total ${totalPrice.toFixed(2)}
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
                    <CheckoutForm 
                        cartItems={cartItems} 
                        totalPrice={totalPrice} />
                </Elements>
            </div>
        </StripeProvider>
    );
}

export default Checkout;