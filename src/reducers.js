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

function products(state = {}, action) {
    switch(action.type) {
        default:
            return state;
    }
}

function productSizeVariants(state = {}, action) {
    switch(action.type) {
        default:
            return state;
    }
}

function productNutrition(state = {}, action) {
    switch(action.type) {
        default:
            return state;
    }
}

function cartStatus(state = DEFAULT, action) {
    switch(action.type) {
        case UPDATE_CART_STATUS:
            return action.status
        default:
            return state;
    }
}

function cartIsVisible(state = false, action) {
    switch(action.type) {
        case TOGGLE_CART_VISIBILITY:
            return (!action.cartIsVisible)
        default:
            return state;
    }
}

function cart(state = [], action) {
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

function heroImageUrl(state = '', action) {
    switch(action.type) {
        default: 
            return state;
    }
}

function infoCards(state = [], action) {
    switch(action.type) {
        default: 
            return state;
    }
}

function testimonialHeadingImgUrl(state = '', action) {
    switch(action.type) {
        default: 
            return state;
    }
}

function testimonials(state = [], action) {
    switch(action.type) {
        default: 
            return state;
    }
}

function sliderImgUrl(state = '', action) {
    switch(action.type) {
        default: 
            return state;
    }
}

const prepdApp = combineReducers({
    products,
    productSizeVariants,
    productNutrition,
    cartIsVisible,
    cartStatus,
    cart,
    heroImageUrl,
    infoCards,
    testimonialHeadingImgUrl,
    testimonials,
    sliderImgUrl
});

export default prepdApp;