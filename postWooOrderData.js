const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerce = new WooCommerceRestApi({
  url: "https://prepdfresh.com",
  consumerKey: process.env.WOO_WRITE_CK,
  consumerSecret: process.env.WOO_WRITE_CS,
  version: "wc/v3",
  queryStringAuth: true // Force Basic Authentication as query string true and using under HTTPS
});

const defaultData = {
  payment_method: "stripe",
  payment_method_title: "Credit Card (Stripe)",
  set_paid: true,
  shipping_lines: [
    {
      method_id: "free_shipping",
      method_title: "Free shipping",
      total: "0"
    }
  ]
};

const postWooOrderData = ({
  cartItems,
  fullCustomerDetails: {
    first_name,
    last_name,
    address_line1: address_1,
    address_line2: address_2,
    address_city: city,
    deliveryAddressLine1,
    deliveryAddressLine2,
    deliveryAddressCity,
    email,
    phoneNumber: phone,
    orderNotes: customer_note
  },
  totalPrice: subtotal
}) =>
  WooCommerce.post("orders", {
    ...defaultData,
    customer_note,
    billing: {
      first_name,
      last_name,
      address_1,
      address_2,
      city,
      email,
      phone
    },
    shipping: {
      first_name,
      last_name,
      address_1: deliveryAddressLine1,
      address_2: deliveryAddressLine2,
      city: deliveryAddressCity
    },
    line_items: Object.values(cartItems).map(
      ({
        productId: product_id,
        name,
        variantId: variation_id,
        qty: quantity
      }) => ({
        name,
        product_id,
        variation_id,
        quantity,
        tax_class: "",
        subtotal: String(subtotal),
        subtotal_tax: "0.00",
        total: String(subtotal),
        total_tax: "0.00",
        taxes: [],
        sku: "",
        tax_class: "",
        price: String((parseFloat(subtotal) * 100) / quantity / 100)
      })
    )
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error.response.data);
      throw "Problem posting order to WooCommerce!";
    });

module.exports = postWooOrderData;
