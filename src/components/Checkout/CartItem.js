import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, updateCartItemQty } from '../../actions';

const CartItem = ({cartItem: {name, ...cartItem}}) => {
    const dispatch = useDispatch();
    const removeFromCart = () => dispatch(removeItemFromCart(cartItem.id));
    const updateItemQty = e => dispatch(updateCartItemQty(
        cartItem.id, 
        e.target.value
    ));
    return (
        <div className="CartItem">
            <div className="item-name-and-size">
                <h4>{name.substr(0, 27)}{name.length > 27 && ' ...'}</h4>
                <p>{cartItem.size}{cartItem.veggie && ', vegetarian'}</p>
            </div>
            <p>${cartItem.itemPrice}</p>
            <p>Quantity 
                <input 
                    pattern="[0-9]*" 
                    type="text" 
                    value={cartItem.qty} 
                    onChange={updateItemQty}/></p>
            <div className="delete-btn">
                <button onClick={removeFromCart}>X</button>
            </div>
        </div>
    );
}

export default CartItem;