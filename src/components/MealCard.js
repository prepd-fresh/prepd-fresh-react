import React from 'react';
import './MealCard.css';

const MealCard = () => (
    <div className="MealCard">
        <div className="meal-img">img</div>
        <div className="meal-info-options">
            <h3>Pesto Chicken</h3>
            <p>This is a brief description of the menu item, yum!</p>
            <input type="radio" /><label>Small</label>
            <input type="radio" /><label>Large</label>
            <input type="checkbox" /><label>Vegetarian</label>
        </div>
        <div className="meal-quantity-price">
            <label>Quantity</label><input type="number" /> $6.99
        </div>
        <div className="meal-add-cart">
            <button>+</button>
        </div>
        <div className="meal-nutrition">
            <p>{`Cal ${270} - Carbs ${44}g - Fat ${20}g - Protein ${22}g`}</p>
        </div>
    </div>
);

export default MealCard;