import React from 'react';
import { useSelector } from 'react-redux'
import MealCard from './MealCard';
import styled from 'styled-components';

const isProductType = desiredType => product => desiredType === product.type
const toProductByIdFrom = productsObj => productId => productsObj[productId] 
const toMealCardFromMealWith = sizeVariants => meal => (
    <MealCard key={meal.id} {...{...meal, sizeVariants}} />
)

const Menu = props => {
    const products = useSelector(state => state.products);
    const productSizeVariants = useSelector(state => ({
        ...state.productSizeVariants
    }));
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