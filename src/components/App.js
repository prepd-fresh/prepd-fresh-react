import React, { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import { StripeProvider, Elements } from "react-stripe-elements";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
${
  "" /* @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap'); */
}
  * {
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    margin: 0!important;
    padding: 0!important;
  }
  h1, h2, h3, h4, h5, h6, p {
    color: #3E444B;
  }
  body {
    font-family: 'Roboto', sans-serif;
  }
  body, html {
    overflow: ${props => (props.cartIsVisible ? "hidden" : "auto")};
    background-color: red;
    touch-action: none;
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  select, 
  textarea, 
  input[type="text"], 
  input[type="password"], 
  input[type="datetime"], 
  input[type="datetime-local"], 
  input[type="date"], 
  input[type="month"], 
  input[type="time"], 
  input[type="week"], 
  input[type="number"], 
  input[type="email"], 
  input[type="url"], 
  input[type="search"], 
  input[type="tel"], 
  input[type="color"],
  select:focus { 
    font-size: 16px; 
  } 
`;

const App = () => {
  const [stripePK, setStripePK] = useState(null);

  useEffect(() => {
    // if (!stripePK) {
    fetch("/stripe-pk")
      .then(response => response.json())
      .then(json => json["stripe-pk"])
      .then(publicKey => setStripePK(publicKey));
    // }
  }, [stripePK]);

  return (
    <React.Fragment>
      <GlobalStyle />
      {stripePK ? (
        <StripeProvider apiKey={stripePK}>
          <Elements>
            <CheckoutForm />
          </Elements>
        </StripeProvider>
      ) : (
        <p>Loading...</p>
      )}
    </React.Fragment>
  );
};

export default App;
