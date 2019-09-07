import React from 'react';
import './MealCard.css';

class MealCard extends React.Component {

    state = {
        size: 'reg',
        quantity: 1,
        isVeggie: false
    }

    handleChange = key => e => this.setState({[key]: e.target.value})

    toggle = key => () => this.setState(prevState => ({
        isVeggie: !prevState.isVeggie
    }))

    render() {
        const style = { backgroundImage: `url('/img/${this.props.imageUrl}')` };
        const { id } = this.props;
        const { size, quantity, isVeggie } = this.state;
        const sizeDetails = Object.keys(this.props.sizeVariants)
            .map(key => this.props.sizeVariants[key])
            .filter(sizeVariant => (
                sizeVariant.productId === id
                && sizeVariant.size === size
            ))[0];
        const nutritionDetails = Object.keys(this.props.nutrition)
            .map(key => this.props.nutrition[key])
            .filter(nutritionObj => (
                nutritionObj.productSizeVariantId === sizeDetails.id
                && nutritionObj.veggie === isVeggie
            ))[0];
        const { cal, car, fat, pro } = nutritionDetails.nutrition;
        return (
            <div className="MealCard">
                <div className="meal-img" style={style}></div>
                <div className="meal-info-options">
                    <h3>{this.props.hed}</h3>
                    <p>{this.props.dek}</p>
                    <input 
                        type="radio" 
                        value="reg"
                        onChange={this.handleChange('size')}
                        checked={this.state.size === 'reg'}
                        name={`${this.props.id}-size`} />
                    <label>Regular</label>
                    <input 
                        type="radio" 
                        value="lg"
                        onChange={this.handleChange('size')}
                        checked={this.state.size === 'lg'}
                        name={`${this.props.id}-size`} />
                    <label>Large</label>
                    {this.props.vOpt && 
                    <React.Fragment>
                        <input 
                            type="checkbox"
                            onChange={this.toggle('isVeggie')} 
                            checked={this.state.isVeggie}/>
                        <label>Vegetarian</label>
                    </React.Fragment>}
                </div>
                <div className="meal-quantity-price">
                    <label>Quantity</label>
                    <input type="number" /> 
                    {sizeDetails.price * quantity}
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