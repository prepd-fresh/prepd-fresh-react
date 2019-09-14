import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, updateCartItemQty } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

const CartItem = ({className, cartItem: {name, ...cartItem}}) => {
    const dispatch = useDispatch();
    const removeFromCart = () => dispatch(removeItemFromCart(cartItem.id));
    const updateItemQty = e => dispatch(updateCartItemQty(
        cartItem.id, 
        e.target.value
    ));
    return (
        <div className={"CartItem " + className}>
            <div className="item-name-and-size">
                <h4>{name.substr(0, 27)}{name.length > 27 && ' ...'}</h4>
                <p>{cartItem.size}{cartItem.veggie && ', vegetarian'}</p>
            </div>
            <div className="qty-price">
                <input 
                    pattern="[0-9]*" 
                    type="text" 
                    value={cartItem.qty} 
                    onChange={updateItemQty}/>
                <p>X ${cartItem.itemPrice}</p>
            </div>
            <FontAwesomeIcon 
                icon={faTrashAlt} 
                size="md" 
                onClick={removeFromCart} />
        </div>
    );
}

export default styled(CartItem)`
    & {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 10px;
        border-bottom: 1px solid gray;
    }

    &:last-child {
        border-bottom: none;
    }

    & .item-name-and-size {
        margin-right: auto;
    }

    & h4,
    & p {
        font-size: 11px;
        margin: 0;
    }

    & .item-name-and-size h4 {
        margin: 0;
    }

    & .qty-price {
        text-align: right;
    }

    & .item-name-and-size p {
        font-size: 11px;
    }

    & input {
        width: 30px;
        border: 1px solid black;
        text-align: right;
    }

    & .fa-trash-alt {
        margin: 10px 0px 10px 15px;
    }
`;