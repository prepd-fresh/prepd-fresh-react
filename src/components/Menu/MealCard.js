import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../actions'
import styled from 'styled-components';

const MealCard = props => {

    const [state, setState] = useState({
        size: 'reg',
        quantity: 1,
        isVeggie: false
    });

    const style = { backgroundImage: `url('/img/${props.imageUrl}')` };
    const { id } = props;
    const { size, quantity, isVeggie } = state;
    const sizeDetails = Object.keys(props.sizeVariants)
        .map(key => props.sizeVariants[key])
        .filter(sizeVariant => (
            sizeVariant.productId === id
            && sizeVariant.size === size
        ))[0];
    const nutritionDetails = Object.keys(props.nutrition)
        .map(key => props.nutrition[key])
        .filter(nutritionObj => (
            nutritionObj.productSizeVariantId === sizeDetails.id
            && nutritionObj.veggie === isVeggie
        ))[0];
    const { cal, car, fat, pro } = nutritionDetails.nutrition;

    const mergeState = newState => setState({
        ...state,
        ...newState
    })

    const handleChange = key => e => mergeState({[key]: e.target.value})

    const handleQuantityChange = ({ target: { value } }) => mergeState({
        quantity: (Number(value) < 1) ? 1 : Number(value)
    })

    const toggle = key => () => mergeState({
        [key]: !state[key]
    })

    const dispatch = useDispatch();
    const addToCart = () => dispatch(addItemToCart({
        productId: id,
        name: props.productName,
        itemPrice: sizeDetails.price,
        size: state.size,
        veggie: state.isVeggie,
        qty: state.quantity
    }))

    return (
        <div className="MealCard">
            <div className="meal-img" style={style}></div>
            <div className="meal-info-options">
                <h3>{props.productName}</h3>
                <p>{props.dek}</p>
                <input 
                    type="radio" 
                    value="reg"
                    onChange={handleChange('size')}
                    checked={state.size === 'reg'}
                    name={`${props.id}-size`} />
                <label>Regular</label>
                <input 
                    type="radio" 
                    value="lg"
                    onChange={handleChange('size')}
                    checked={state.size === 'lg'}
                    name={`${props.id}-size`} />
                <label>Large</label>
                {props.vOpt && 
                <React.Fragment>
                    <input 
                        type="checkbox"
                        onChange={toggle('isVeggie')} 
                        checked={state.isVeggie}/>
                    <label>Vegetarian</label>
                </React.Fragment>}
            </div>
            <div className="meal-quantity-price">
                <label>Quantity</label>
                <input type="number" 
                        value={state.quantity} 
                        onChange={handleQuantityChange} /> 
                ${(sizeDetails.price * quantity).toFixed(2)}
            </div>
            <div className="meal-add-cart">
                <button onClick={addToCart}>+</button>
            </div>
            <div className="meal-nutrition">
                <p>{`Cal ${cal * quantity} - Carbs ${car * quantity}g - Fat ${fat * quantity}g - Protein ${pro * quantity}g`}</p>
            </div>
        </div>
    )
};

export default styled(MealCard)`
    & {
        border: 1px solid blue;
        box-sizing: content-box;
        display: grid;
        grid-template: 80px 20px auto / 100px 1fr;
        height: 150px;
    }

    & > * {
        border: 1px solid green;
    }

    & h3 {
        font-size: 12px;
        margin: 5px;
        font-weight: normal;
    }

    & .meal-info-options p {
        font-size: 11px;
        font-style: italic;
        color: grey;
        margin: 0 5px;
    }

    & label {
        font-size: 11px;
    }

    .meal-img {
        grid-area: 1 / 1 / span 2 / span 1;
        background-size: cover;
        background-position: center;
    }

    .meal-quantity-price input {
        width: 33%;
    }

    .meal-add-cart,
    .meal-nutrition {
        grid-column: 1 / span 2;
        text-align: center;
    }

    .meal-nutrition {
        font-size: 11px;
    }

    button {
        background: #23B47E;
        border: none;
        color: white;
        border-radius: 2px;
    }

    @media screen and (min-width: 1024px) {
        & {
            grid-template: 150px 2fr repeat(2, 1fr) / 1fr 1fr;
            height: 350px;
        }

        .meal-img {
            grid-area: 1 / 1 / span 1 / span 2;
        }
        
        .meal-add-cart {
            grid-column: 2 / span 1;
        }

        .meal-info-options,
        .meal-nutrition {
            grid-column: 1 / span 2;
        }
    }
`;