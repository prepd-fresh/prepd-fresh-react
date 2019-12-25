require("dotenv").config();
const fetchWooProductData = require("./fetchWooProductData");
const postWooOrderData = require("./postWooOrderData");
const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const bodyParser = require("body-parser");
// TODO: replace my (Dustin's) secret key with Ben's
const stripe = require("stripe")(process.env.STRIPE_SK);

const port = process.env.PORT || 9000;

const app = express();

app.use(favicon(__dirname + "/build/favicon.ico"));

app.use(express.static(path.join(__dirname, "build")));

const areProductsAvailable = (orderProductIds, availableProductIds) =>
  orderProductIds.reduce(
    (productsAreValid, productId) =>
      productsAreValid
        ? availableProductIds.includes(productId)
        : productsAreValid,
    true
  );
const areProductPricesCorrect = (orderProducts, wooProductVariants) =>
  Object.values(orderProducts).reduce(
    (pricesAreValid, product) =>
      pricesAreValid
        ? parseFloat(product.itemPrice) ===
          parseFloat(wooProductVariants[String(product.variantId)].price)
        : pricesAreValid,
    true
  );

const isTotalCorrect = (orderProducts, totalPrice) =>
  parseFloat(
    Object.values(orderProducts).reduce(
      (actualTotal, product) => actualTotal + product.itemPrice * product.qty,
      0
    )
  ) === parseFloat(totalPrice);

// for stripe
const jsonParser = bodyParser.json();

// test endpoint, for use during checkout form migration

app.post("/charge", jsonParser, async (req, res) => {
  return fetchWooProductData()
    .then(data => {
      console.log(JSON.stringify(req.body));
      const { tokenId, fullCustomerDetails, cartItems, totalPrice } = req.body;
      if (
        !areProductsAvailable(
          Object.values(cartItems).map(item => String(item.productId)),
          Object.keys(data.products).map(String)
        )
      ) {
        throw "Items in cart are no longer available for order.";
      } else if (
        !areProductPricesCorrect(cartItems, data.productSizeVariants)
      ) {
        throw "Incorrect cart item prices.";
      } else if (!isTotalCorrect(cartItems, totalPrice)) {
        throw "Cart total does not match item prices.";
      } else if (totalPrice < 0) {
        throw "Cart total should be no less than $0";
      } else if (totalPrice == 0) {
        return {
          status: "no charge",
          fullCustomerDetails,
          cartItems,
          totalPrice
        };
      }
      return stripe.charges.create(
        {
          amount: parseInt(totalPrice * 100),
          currency: "cad",
          description: "making a charge",
          source: tokenId
        },
        (err, charge) => {
          if (err) {
            res.status(500).end();
            throw err;
          }
          if (charge.status === "succeeded") {
            res.json({
              status: charge.status,
              fullCustomerDetails,
              cartItems,
              totalPrice
            });
          }
          res.status(500).end;
        }
      );
    })
    .then(orderDetails => {
      if (orderDetails.status === "failed") throw "payment failed";
      res.json(orderDetails);
      // postWooOrderData(orderDetails).then(() => res.json(orderDetails));
    })
    .catch(err => {
      res.status(500).end();
    });
});

const sendProductDataToApp = res => ({ products, productSizeVariants }) =>
  res.json({ products, productSizeVariants });

const handleWooProductGetError = res => error => {
  res.status(500).end();
};

app.get("/products", jsonParser, async (req, res) => {
  fetchWooProductData()
    .then(sendProductDataToApp(res))
    .catch(handleWooProductGetError(res));
});

app.get("/stripe-pk", jsonParser, async (req, res) => {
  res.json({ "stripe-pk": process.env.STRIPE_PK });
});

app.listen(port);

module.exports = {
  areProductsAvailable,
  areProductPricesCorrect,
  isTotalCorrect
};
