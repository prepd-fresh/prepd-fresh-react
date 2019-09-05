// action types
export const ADD_MEAL_TO_CART = 'ADD_MEAL_TO_CART';
export const TOGGLE_CART_VISIBILITY = 'TOGGLE_CART_VISIBILITY';
export const REMOVE_MEAL_FROM_CART = 'REMOVE_MEAL_FROM_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const UPDATE_MEAL_CARD_OPTIONS = 'UPDATE_MEAL_CARD_OPTIONS';
export const SET_CART_STATUS = {
    DEFAULT: "DEFAULT",
    FAILED: "FAILED",
    SUCCESS: "SUCCESS"
};

// action creators

export const addItemToCart = cartItem => ({
    type: ADD_MEAL_TO_CART, 
    cartItem
})
export const toggleCartVisibility = cartVisibility => ({
    type: TOGGLE_CART_VISIBILITY, 
    cartVisibility
})
export const removeItemFromCart = cartItemId => ({
    type: REMOVE_MEAL_FROM_CART, 
    cartItemId
})
export const updateCartItem = cartItem => ({
    type: UPDATE_CART_ITEM, 
    cartItem
})
export const updateMealCardOptions = meal => ({
    type: UPDATE_MEAL_CARD_OPTIONS, 
    meal
})
export const setCartStatus = status => ({
    type: SET_CART_STATUS, 
    status
})