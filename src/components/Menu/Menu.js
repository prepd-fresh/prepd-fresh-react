import React from 'react';
import { useSelector } from 'react-redux'
import MealCard from './MealCard';
import './Menu.css';

const isProductType = desiredType => product => desiredType === product.type
const toProductByIdFrom = productsObj => productId => productsObj[productId] 
const toMealCardFromMealWith = (sizeVariants, nutrition) => meal => (
    <MealCard key={meal.id} {...{...meal, sizeVariants, nutrition}} />
)

const Menu = props => {
    const products = useSelector(state => state.products);
    const productSizeVariants = useSelector(state => ({
        ...state.productSizeVariants
    }));
    const productNutrition = useSelector(state => ({
        ...state.productNutrition
    }));
    return (
        <div className="Menu">
            <h2>Menu</h2>
            <p>Choose from our weekly rotating selection of dishes!</p>
            <p>Meals are delivered every Sunday. The next delivery date is Sunday, July 28. Order by 11:59pm Friday, July 26 to receive your delivery this Sunday.</p>
            <div className="MealCard-container">
                {Object.keys(products)
                        .map(toProductByIdFrom(products))
                        .filter(isProductType('meal'))
                        .map(toMealCardFromMealWith(
                            productSizeVariants, 
                            productNutrition
                        ))}
            </div>
        </div>
    );
};

export default Menu;