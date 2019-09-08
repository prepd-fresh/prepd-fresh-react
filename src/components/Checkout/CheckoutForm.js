import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
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
    address: yup.string()
        .required('Required')
        .matches(
            /^[\d]{1,}[a-zA-Z\s]{1,}$/,
            'Invalid address format.'
        ),
    phoneNumber: yup.string()
        .required('Required')
        .matches(
            /^\d{3}-\d{3}-\d{4}$/, 
            'Phone number must have the format "647-123-4567"'
        ),
    email: yup.string()
        .email('Invalid email')
        .required('Required'),
})

const CheckoutForm = (props) => {
  const [complete, setComplete] = useState(false);

  return (complete) 
    ? <h1>Purchase Complete</h1>
    : (
      <div className="checkout">
        <Formik 
          initialValues={{
              firstName: "",
              lastName: "",
              address: "",
              phoneNumber: "",
              email: "",
          }}
          validationSchema={checkoutValidationSchema}
          onSubmit={async ev => {
              let {token} = await props.stripe.createToken({
                  name: "Name"
              });
              let response = await fetch(
                  "/charge", 
                  {
                      method: "POST",
                      headers: { "Content-Type": "text/plain" },
                      body: token.id
                  }
              );
              if (response.ok) setComplete(true);
          }}>
          {({ errors, touched }) => (
              <Form>
                <p>Would you like to finish your purchase?</p>
                <CardElement />
                <Field 
                    name="firstName" 
                    placeholder="firstName"    
                />
                {(errors.firstName && touched.firstName)
                    ? <div>{errors.firstName}</div>
                    : null}
                <Field 
                    name="lastName" 
                    placeholder="lastName"    
                />
                {(errors.lastName && touched.lastName)
                    ? <div>{errors.lastName}</div>
                    : null}
                <Field 
                    name="address" 
                    placeholder="address"    
                />
                {(errors.address && touched.address)
                    ? <div>{errors.address}</div>
                    : null}
                <Field 
                    name="phoneNumber" 
                    placeholder="phoneNumber"    
                />
                {(errors.phoneNumber && touched.phoneNumber)
                    ? <div>{errors.phoneNumber}</div>
                    : null}
                <Field 
                    name="email" 
                    placeholder="email"    
                />
                {(errors.email && touched.email)
                    ? <div>{errors.email}</div>
                    : null}
                <br/><button type="submit">Pay $</button>
              </Form>
            )}
        </Formik>
      </div>
    );
}

export default injectStripe(CheckoutForm);