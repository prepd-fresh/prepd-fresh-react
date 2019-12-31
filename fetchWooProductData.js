const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerce = new WooCommerceRestApi({
  url: "https://prepdfresh.com",
  consumerKey: process.env.WOO_READ_CK,
  consumerSecret: process.env.WOO_READ_CS,
  version: "wc/v3",
  queryStringAuth: true // Force Basic Authentication as query string true and using under HTTPS
});

const fromWooToAppProduct = (
  acc,
  { id, name, type, images: [{ src: imageUrl }] }
) => ({
  ...acc,
  [id]: {
    id,
    name,
    type,
    imageUrl,
    veggie: id === 4156, // this product is being reused for all veggie dishes
    description: "this is a mock description until the api is updated."
  }
});

const productIsMeal = x =>
  x.categories.filter(category => category.name === "Menu").length;

const handleWooProductGetSuccess = wcResponse => {
  const meals = wcResponse.data.filter(productIsMeal);
  const products = meals.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.id]: {
        type: "meal",
        id: String(curr.id),
        productName: curr.name,
        stock_status: curr.stock_status,
        dek: curr.description.replace(/<\/?p>/gi, ""),
        veggie: curr.id === "4156",
        imageUrl: curr.images[0].src
      }
    }),
    {}
  );
  return products;
};

const productVariationsArrIntoObject = productId => (
  acc,
  {
    id,
    weight,
    dimensions: { length, width, height },
    attributes: [{ option: size }],
    price
  }
) => ({
  ...acc,
  [id]: {
    id: String(id),
    productId,
    size,
    price: parseFloat(price),
    nutrition: {
      // variation weight and dimensions were repurposed for nutrition info
      cal: weight,
      car: length,
      fat: width,
      pro: height
    }
  }
});

const arrOfObjectsIntoOneObj = (acc, curr) => ({ ...acc, ...curr });

const fetchWooProductVariations = products => {
  const productSizeVariationPromises = Object.keys(products).map(id =>
    WooCommerce.get(`products/${id}/variations`).then(response =>
      response.data.reduce(productVariationsArrIntoObject(id), {})
    )
  );
  return Promise.all(productSizeVariationPromises).then(
    productSizeVariationsArr => {
      const result = {
        products,
        productSizeVariants: productSizeVariationsArr.reduce(
          arrOfObjectsIntoOneObj,
          {}
        )
      };
      return result;
    }
  );
};

const fetchWooProductData = () =>
  WooCommerce.get("products")
    .then(handleWooProductGetSuccess)
    .then(fetchWooProductVariations);

module.exports = fetchWooProductData;
