import React from 'react';
import { removeItemFromCart, updateCartItemQty } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import './Checkout.css';

const CartItem = ({cartItem: {name, ...cartItem}}) => {
    const dispatch = useDispatch();
    const removeFromCart = () => dispatch(removeItemFromCart(cartItem.id));
    const updateItemQty = e => dispatch(updateCartItemQty(
        cartItem.id, 
        Number(e.target.value)
    ));
    return (
        <div className="CartItem">
            <div className="item-name-and-size">
                <h4>{name.substr(0, 27)}{name.length > 27 && ' ...'}</h4>
                <p>{cartItem.size}{cartItem.veggie && ', vegetarian'}</p>
            </div>
            <p>${cartItem.itemPrice}</p>
            <p>Quantity <input type="number" 
                    value={cartItem.qty} 
                    onChange={updateItemQty}/></p>
            <div className="delete-btn">
                <button onClick={removeFromCart}>X</button>
            </div>
        </div>
    );
}

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
                    Total ${totalPrice}
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
}

export default Checkout;