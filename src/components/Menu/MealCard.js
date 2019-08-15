import React from 'react';
import './MealCard.css';

class MealCard extends React.Component {

    state = {
        size: 'sm',
        quantity: 1
    }

    render() {
        const style = { backgroundImage: `url('/img/${this.props.imageUrl}')` };
        const { size, quantity } = this.state;
        const { cal, car, fat, pro } = this.props[size].nutrition;
        return (
            <div className="MealCard">
                <div className="meal-img" style={style}></div>
                <div className="meal-info-options">
                    <h3>{this.props.hed}</h3>
                    <p>{this.props.dek}</p>
                    <input type="radio" name="size" /><label>Small</label>
                    <input type="radio" name="size" /><label>Large</label>
                    {this.props.vOpt && <React.Fragment><input type="checkbox" /><label>Vegetarian</label></React.Fragment>}
                </div>
                <div className="meal-quantity-price">
                    <label>Quantity</label><input type="number" /> {this.props[size].price * quantity}
                </div>
                <div className="meal-add-cart">
                    <button>+</button>
                </div>
                <div className="meal-nutrition">
                    <p>{`Cal ${cal * quantity} - Carbs ${car * quantity}g - Fat ${fat * quantity}g - Protein ${pro * quantity}g`}</p>
                </div>
            </div>
        )
    }
};

export default MealCard;