import { combineReducers } from 'redux';
import {
    ADD_ITEM_TO_CART,
    TOGGLE_CART_VISIBILITY,
    REMOVE_ITEM_FROM_CART,
    UPDATE_CART_ITEM,
    UPDATE_CART_STATUS,
    CartStatuses
} from './actions';
const { DEFAULT } = CartStatuses;

function cartStatus (state = DEFAULT, action) {
    switch(action.type) {
        case UPDATE_CART_STATUS:
            return action.status
        default:
            return state;
    }
}

function cartVisibility (state = false, action) {
    switch(action.type) {
        case TOGGLE_CART_VISIBILITY:
            return (!action.cartVisibility)
        default:
            return state;
    }
}

function cart (state = [], action) {
    switch(action.type) {
        case ADD_ITEM_TO_CART:
            return [
                ...state,
                action.cartItem
            ];
        case REMOVE_ITEM_FROM_CART:
            return state.filter(
                cartItem => (cartItem.id !== action.cartItemId)
            );
        case UPDATE_CART_ITEM:
            return state.map(
                cartItem => (cartItem.id) ? action.cartItem : cartItem
            );
        default:
            return state;
    }
}

const prepdApp = combineReducers({
    cartVisibility,
    cartStatus,
    cart
});

export default prepdApp;