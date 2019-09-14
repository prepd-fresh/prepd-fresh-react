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
        <div className={"MealCard " + props.className}>
            <div className="top-row">
                <div className="meal-img-wrapper">
                    <img className="meal-img" src={`/img/${props.imageUrl}`} />
                </div>
                <div className="meal-details">
                    <div className="meal-info-options">
                        <h3>{props.productName}</h3>
                        <p>{props.dek}</p>
                        <label>
                            <input 
                                type="radio" 
                                value="reg"
                                onChange={handleChange('size')}
                                checked={state.size === 'reg'}
                                name={`${props.id}-size`} />
                            Regular
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="lg"
                                onChange={handleChange('size')}
                                checked={state.size === 'lg'}
                                name={`${props.id}-size`} />
                            Large
                        </label>
                        {props.vOpt && (
                            <label>
                                <input 
                                    type="checkbox"
                                    onChange={toggle('isVeggie')} 
                                    checked={state.isVeggie}/>
                                Vegetarian
                            </label>
                        )}
                    </div>
                    <hr/>
                    <div className="meal-quantity-price">
                        <label>Quantity</label>
                        <input type="number" 
                                value={state.quantity} 
                                onChange={handleQuantityChange} /> 
                        ${(sizeDetails.price * quantity).toFixed(2)}
                    </div>
                </div>
            </div>
            <div className="meal-add-cart">
                <button onClick={addToCart}>+</button>
            </div>
            <hr />
            <div className="meal-nutrition">
                <p>{`Cal ${cal * quantity} - Carbs ${car * quantity}g - Fat ${fat * quantity}g - Protein ${pro * quantity}g`}</p>
            </div>
        </div>
    )
};

export default styled(MealCard)`
    & {
        box-sizing: content-box;
        display: flex;
        flex-direction: column;
        margin: 10px 0;
        background-color: #FFF;
        border-radius: 5px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16);
        padding: 10px;
    }

    & h3 {
        font-size: 12px;
        margin: 5px;
        font-weight: normal;
    }

    .meal-details {
        display: flex;
        flex-shrink: 3;
        ${'' /* display: inline-block; */}
        flex-direction: column;
        padding: 0 5px;
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

    .top-row {
        display: flex;
        justify-content: flex-start;
    }

    .meal-img {
        position: absolute;
        top: -100%;
        right: -100%;
        bottom: -100%;
        left: -100%;
        height: 100%;
        display: inline;
        margin: auto;
    }

    .meal-img-wrapper {
        ${'' /* display: inline-block; */}
        position: relative;
        flex: 0 0 auto;
        width: 100px;
        height: 100px;
        border-radius: 5px;
        overflow: hidden;
        text-align: center;
    }

    .meal-quantity-price input {
        width: 33%;
    }

    .meal-add-cart,
    .meal-nutrition {
        text-align: center;
    }

    .meal-nutrition {
        font-size: 11px;
        p {
            color: #A7A5A5;
            margin: 0;
        }
    }

    button {
        background: #23B47E;
        border: none;
        color: white;
        border-radius: 2px;
        width: 100%;
        height: 30px;
        margin-top: 10px;
    }

    hr {
        width: 100%;
        border: 0.75px solid #f1f1f1;
    }

    @media screen and (min-width: 1024px) {
        & {
            height: 350px;
        }
    }
`;