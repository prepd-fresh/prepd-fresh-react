import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CardElement, injectStripe } from 'react-stripe-elements';

const checkoutValidationSchema = yup.object().shape({
    firstName: yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    lastName: yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    addressLine1: yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    addressLine2: yup.string()
        .required('Required')
        .min(1, 'Too Short!')
        .max(50, 'Too Long!'),
    city: yup.string()
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
});

const CheckoutForm = ({stripe, cartItems, totalPrice}) => {
  const [complete, setComplete] = useState(false);

  const handleSubmit = async ({
        firstName, 
        lastName, 
        addressLine1, 
        addressLine2, 
        city,
        email
    }) => {
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
            setComplete(true);
        }
    }

  return (complete) 
    ? <h1>Purchase Complete</h1>
    : (
      <div className="checkout">
        <Formik 
          initialValues={{
              firstName: "",
              lastName: "",
              addressLine1: "",
              addressLine2: "",
              city: "",
              phoneNumber: "",
              email: "",
          }}
          validationSchema={checkoutValidationSchema}
          onSubmit={handleSubmit}>
          {({ errors, touched }) => (
              <Form>
                <p>Would you like to finish your purchase?</p>
                <CardElement />
                <Field name="firstName" placeholder="firstName" />
                <ErrorMessage name="firstName" />
                <Field name="lastName" placeholder="lastName" />
                <ErrorMessage name="lastName" />
                <Field name="addressLine1" placeholder="address line 1" />
                <ErrorMessage name="addressLine1" />
                <Field name="addressLine2" placeholder="address line 2" />
                <ErrorMessage name="addressLine2" />
                <Field name="city" placeholder="city" />
                <ErrorMessage name="city" />
                <Field name="phoneNumber" placeholder="phoneNumber" />
                <ErrorMessage name="phoneNumber" />
                <Field name="email" placeholder="email" />
                <ErrorMessage name="email" />
                <br/><button type="submit">Pay $</button>
              </Form>
            )}
        </Formik>
      </div>
    );
}

export default injectStripe(CheckoutForm);