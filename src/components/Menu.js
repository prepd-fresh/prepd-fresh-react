import React from 'react';
import MealCard from './MealCard';
import './Menu.css';

const Menu = () => (
    <div className="Menu">
        <h2>Menu</h2>
        <p>Choose from our weekly rotating selection of dishes!</p>
        <p>Meals are delivered every Sunday. The next delivery date is Sunday, July 28. Order by 11:59pm Friday, July 26 to receive your delivery this Sunday.</p>
        <div className="MealCard-container">
            <MealCard />
            <MealCard />
            <MealCard />
        </div>
    </div>
);

export default Menu;