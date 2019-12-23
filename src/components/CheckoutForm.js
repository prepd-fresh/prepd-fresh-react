import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CartStatuses, updateCartStatus } from "../actions";
import { CardElement, injectStripe } from "react-stripe-elements";

const StripeFormField = ({ stripe }) => {
  const sendMessageToRN = action => {
    if (window.hasOwnProperty("ReactNativeWebView")) {
      window.ReactNativeWebView.postMessage(JSON.stringify(action));
    } else {
      console.log("page not loaded in WebView. Action posted:\n", action);
    }
  };

  const handleMessageFromRN = async data => {
    let parsedData =
      typeof data.data === "string" ? JSON.parse(data.data) : data.data;
    // Do something with RN data
    if (parsedData.type === "FORM_SUBMITTED") {
      let { token } = await getStripeToken(
        parsedData.details.customer.stripeDetails
      );
      const { cartItems, totalPrice } = parsedData.details.cartDetails;
      const { stripeDetails, ...customerDetails } = parsedData.details.customer;
      let response = await fetch("/charge", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tokenId: token.id,
          fullCustomerDetails: {
            ...stripeDetails,
            ...customerDetails
          },
          cartItems,
          totalPrice
        })
      });
      if (response.ok) {
        console.log(response.json());
        sendMessageToRN(updateCartStatus(CartStatuses.SUCCESS));
        setTimeout(() => {
          sendMessageToRN(updateCartStatus(CartStatuses.DEFAULT));
        }, 3000);
      } else {
        sendMessageToRN(updateCartStatus(CartStatuses.FAILED));
        setTimeout(() => {
          sendMessageToRN(updateCartStatus(CartStatuses.DEFAULT));
        }, 3000);
      }
    }
  };

  useEffect(() => {
    // we add to document and window because of android / ios differences
    document.addEventListener("message", handleMessageFromRN);
    window.addEventListener("message", handleMessageFromRN);

    return () => {
      // we remove from document and window because of android / ios differences
      document.removeEventListener("message", handleMessageFromRN);
      window.removeEventListener("message", handleMessageFromRN);
    };
  });

  const getStripeToken = stripeDetails => stripe.createToken(stripeDetails);

  return (
    <div
      className="card-element-wrapper"
      style={{
        height: 40,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <CardElement
        className="card-element"
        style={{
          base: {
            backgroundColor: "#FFF",
            "::placeholder": {
              color: "#AAA",
              fontSize: "16px",
              fontWeight: 300
            }
          }
        }}
      />
    </div>
  );
};

export default injectStripe(styled(StripeFormField)`
  input,
  .card-element {
    background-color: white;
    font-family: "Roboto", sans-serif;
    border: none;
    color: #3e444b;
    font-size: 16px;
    font-weight: 300;
    border-radius: 3px;
    width: 100%;
    &[type="checkbox"] {
      width: 30px;
    }
    &::-webkit-input-placeholder {
      /* Edge */
      color: #aaa;
      font-weight: 100;
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #aaa;
      font-weight: 100;
    }

    &::placeholder {
      color: #aaa;
      font-weight: 100;
    }
  }
`);
