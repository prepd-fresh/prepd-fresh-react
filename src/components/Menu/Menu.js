import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import MealCard from './MealCard';
import styled from 'styled-components';
import { toggleCartVisibility } from '../../actions';
import CartLinkPopup from './CartLinkPopup';

const isProductType = desiredType => product => desiredType === product.type
const toProductByIdFrom = productsObj => productId => productsObj[productId] 
const toMealCardFromMealWith = sizeVariants => meal => (
    <MealCard key={meal.id} {...{...meal, sizeVariants}} />
)

const Menu = props => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const cart = useSelector(state => state.cart);
    const cartIsNotVisible = !useSelector(state => state.cartIsVisible);
    const productSizeVariants = useSelector(state => ({
        ...state.productSizeVariants
    }));

    const cartArr = Object.values(cart);
    const qtyOfCartItems = cartArr.reduce(
        (total, item) => total + item.qty,
        0
    );
    const totalPrice = cartArr.reduce(
        (total, item) => total + (item.itemPrice * item.qty * 100), 0
    ) / 100;
    const cartItemsExist = !!cartArr.length;

    const openCart = () => { 
        if (cartIsNotVisible) dispatch(toggleCartVisibility())
    };

    return (
        <div className={props.className}>
            <h2>Menu</h2>
            <p>Choose from our weekly rotating selection of dishes!</p>
            <p>Meals are delivered every Sunday. The next delivery date is Sunday, July 28. Order by 11:59pm Friday, July 26 to receive your delivery this Sunday.</p>
            <div className="MealCard-container">
                {Object.keys(products)
                        .map(toProductByIdFrom(products))
                        .filter(isProductType('meal'))
                        .map(toMealCardFromMealWith(productSizeVariants))}
            </div>
            {cartItemsExist && 
            <CartLinkPopup 
                qtyOfItems={qtyOfCartItems} 
                total={totalPrice}
                openCart={openCart} />}
        </div>
    );
};

export default styled(Menu)`
    & {
        padding: 0 20px;
        height: 100%;
    }

    .MealCard-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
        flex-wrap: wrap;
        justify-content: center;
    }

    @media screen and (min-width: 1024px) {
        max-width: 1024px;

        .MealCard-container {
            flex-direction: row;
        }
    }
`;