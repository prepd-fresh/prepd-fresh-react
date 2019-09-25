import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { updateCartStatus, CartStatuses } from '../../actions';
import styled from 'styled-components';

const Checkbox = ({ field, type, checked }) => (
    <label>
    <input {...field} type={type} checked={checked} />
    {field.label}
    </label>
);

const checkoutValidationSchema = yup.object().shape({
    firstName: yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    lastName: yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    billingAddressLine1: yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    billingAddressLine2: yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!'),
    billingAddressCity: yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    deliveryAddressLine1: yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    deliveryAddressLine2: yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!'),
    deliveryAddressCity: yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    phoneNumber: yup.string()
        .required('Required')
        .min(10, 'Phone number must be at least 10 digits')
        .max(14, 'Phone number cannot be longer than 14 digits')
        .matches(
            /^\(?\d{3}\)?[\-\ ]?\ ?\d{3}[\-\ ]?\d{4}$/, 
            'Invalid phone number format, try ###-###-####'
        ),
    email: yup.string()
        .email('Invalid email')
        .required('Required'),
    orderNotes: yup.string()    
        .max(150, 'Too Long!'),
});

const CheckoutForm = ({stripe, cartItems, totalPrice, className, resetScroll}) => {
  const cartStatus = useSelector(state => state.cartStatus);
  const dispatch = useDispatch();

  const handleSubmit = async ({
        firstName, 
        lastName, 
        addressLine1, 
        addressLine2, 
        city,
        email
    }) => {
        dispatch(updateCartStatus(CartStatuses.PROCESSING));

        let customerDetails = {
            name: `${firstName} ${lastName}`,
            address_line1: addressLine1,
            address_line2: addressLine2,
            address_city: city,
        }
        let {token} = await stripe.createToken(customerDetails);
        let response = await fetch(
            "/charge", 
            {
                method: "POST",
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tokenId: token.id,
                    customerDetails: {
                        ...customerDetails,
                        email
                    },
                    cartItems,
                    totalPrice
                })
            }
        );
        
        if (response.ok) {
            console.log(response.json())
            dispatch(updateCartStatus(CartStatuses.SUCCESS));
            setTimeout(
                () => {
                    dispatch(updateCartStatus(CartStatuses.DEFAULT));
                    resetScroll();
                },
                3000
            );
        }
    }

  return (
        <div className={`checkout ${cartStatus} ${className}`}>
            <div className="processing-message">
                <h2>Processing order...</h2>
            </div>
            <div className="success-message">
                <h2>Payment successful</h2>
                <p>Thank you for ordering from Prep'd Fresh!</p>
            </div>
            {
                (cartStatus !== CartStatuses.SUCCESS && totalPrice > 0) && (
                    <div className="checkout-form">
                        <Formik 
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            billingAddressLine1: "",
                            billingAddressLine2: "",
                            billingAddressCity: "",
                            useBillingAddressForDelivery: false,
                            deliveryAddressLine1: "",
                            deliveryAddressLine2: "",
                            deliveryAddressCity: "",
                            phoneNumber: "",
                            email: "",
                            orderNotes: ""
                        }}
                        validationSchema={checkoutValidationSchema}
                        onSubmit={handleSubmit}>
                        {({ values, setFieldValue }) => (
                            <React.Fragment>
                                <p>Would you like to finish your purchase?</p>
                                <Form>
                                    <CardElement 
                                        className="card-element"
                                        style={{
                                            base: {
                                                "::placeholder": {
                                                    color: "#AAA",
                                                    fontSize: "16px",
                                                    fontWeight: 100
                                                }
                                            }
                                        }} />
                                    <Field name="firstName" placeholder="First name" />
                                    <ErrorMessage name="firstName" />
                                    <Field name="lastName" placeholder="Last name" />
                                    <ErrorMessage name="lastName" />
                                    <fieldset>
                                        <legend>Billing Address</legend>
                                        <Field name="billingAddressLine1" placeholder="Billing address line 1" />
                                        <ErrorMessage name="billingAddressLine1" />
                                        <Field name="billingAddressLine2" placeholder="Billing address line 2 (Optional)" />
                                        <ErrorMessage name="billingAddressLine2" />
                                        <Field name="billingAddressCity" placeholder="Billing address city" />
                                        <ErrorMessage name="billingAddressCity" />
                                    </fieldset>
                                    {
                                        (!!values.billingAddressLine1.length && !!values.billingAddressCity) && (
                                            <React.Fragment>
                                                <Field 
                                                type="checkbox" 
                                                onClick={() => {
                                                    if (!values.useBillingAddressForDelivery) {
                                                        setFieldValue(
                                                            'deliveryAddressLine1',
                                                            values.billingAddressLine1
                                                        );
                                                        setFieldValue(
                                                            'deliveryAddressLine2',
                                                            values.billingAddressLine2
                                                        );
                                                        setFieldValue(
                                                            'deliveryAddressCity',
                                                            values.billingAddressCity
                                                        );
                                                    } else {
                                                        setFieldValue(
                                                            'deliveryAddressLine1',
                                                            '',
                                                            false
                                                        );
                                                        setFieldValue(
                                                            'deliveryAddressLine2',
                                                            '',
                                                            false
                                                        );
                                                        setFieldValue(
                                                            'deliveryAddressCity',
                                                            '',
                                                            false
                                                        );
                                                    }
                                                }} 
                                                name="useBillingAddressForDelivery" 
                                                label="Use billing address for delivery" 
                                                checked={values.useBillingAddressForDelivery} /> 
                                                Use billing address for delivery
                                            </React.Fragment>
                                        )
                                    }
                                    <fieldset>
                                        <legend>Delivery Address</legend>
                                        <Field name="deliveryAddressLine1" placeholder="Delivery address line 1" />
                                        <ErrorMessage name="deliveryAddressLine1" />
                                        <Field name="deliveryAddressLine2" placeholder="Delivery address line 2 (Optional)" />
                                        <ErrorMessage name="deliveryAddressLine2" />
                                        <Field name="deliveryAddressCity" placeholder="Delivery address city" />
                                        <ErrorMessage name="deliveryAddressCity" />
                                    </fieldset>
                                    <Field name="phoneNumber" placeholder="Phone number" />
                                    <ErrorMessage name="phoneNumber" />
                                    <Field name="email" placeholder="Email" />
                                    <ErrorMessage name="email" />
                                    <Field name="orderNotes" placeholder="Order notes (Optional)" />
                                    <ErrorMessage name="orderNotes" />
                                    <br/><button type="submit">Pay ${totalPrice}</button>
                                </Form>
                            </React.Fragment>
                            )}
                        </Formik>
                    </div>
                )
            }
      </div>
    );
}

export default styled(injectStripe(CheckoutForm))`
    position: relative;
    height: 500px;
    width: 100%;
    
    form {
        fieldset {
            border-radius: 10px;
            margin: 10px 0;
            border: 1px solid #CCC;
        }
        legend {
            color: #AAA;
        }
        & input, & .card-element {
            background-color: white;
            font-family: 'Roboto', sans-serif;
            border: none;
            color: #3E444B;
            font-size: 16px;
            font-weight: 300;
            border-radius: 3px;
            margin: 5px 5px 0 0;
            padding: 5px;
            width: 100%;
            &[type="checkbox"]{
                width: 30px;
            }
        }
        & input, & .card-element {
            ${'' /* &::placeholder {
                color: grey;
                font-weight: 100;
            } */}
            &::-webkit-input-placeholder { /* Edge */
               color: #AAA;
               font-weight: 100;
            }

            &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: #AAA;
                font-weight: 100;
            }

            &::placeholder {
                color: #AAA;
                font-weight: 100;
            }
        }
        p {
            color: #666;
            font-size: 12px;
            font-style: italic;
        }
        &> button {
            background: #23B47E;
            border: none;
            color: white;
            border-radius: 2px;
            width: 100%;
            height: 30px;
            margin-top: 10px;
        }
    }
    .checkout-form, 
    .processing-message, 
    .success-message {
        position: absolute;
        top: 0;
        left: 0;
    }
    
    &.DEFAULT {
        .checkout-form {
            visibility: visible;
            opacity: 1;
            transition: opacity 0.2s linear;
        }
        .processing-message {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s 0.2s, opacity 0.2s linear;
        }
        .success-message {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s 0.2s, opacity 0.2s linear;
        }
    }
    
    &.PROCESSING {
        .checkout-form {
            visibility: hidden;
            opacity: 0;
            ${'' /* transition: visibility 0s 0.2s, opacity 0.2s linear; */}
        }
        .processing-message {
            visibility: visible;
            opacity: 1;
            ${'' /* transition: opacity 0.2s linear; */}
        }
        .success-message {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s 0.2s, opacity 0.2s linear;
        }
    }
    
    &.SUCCESS {
        .checkout-form {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s 0.2s, opacity 0.2s linear;
        }
        .processing-message {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s 0.2s, opacity 0.2s linear;
        }
        .success-message {
            visibility: visible;
            opacity: 1;
            transition: opacity 0.2s linear;
            h2, p {
                color: #23B47E;
            }
        }
    }
`;