# prepd-fresh-react

Server with an API for Prep'd Fresh Stripe and WooCommerce connections, as well as order validation. Leverages create-react-app to serve the Stripe credit card field securely to the Prep'd Fresh mobile app via WebView and also indirectly dispatches the app's payment status update actions.

This will live on Heroku for now and is not a part of the Expo app build. Heroku automatically runs `npm run build` on their end for hosted apps, so the Procfile only has to specify for Heroku to run `node server.js`.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the app to the `build` folder.<br>

### `node server.js`

From the root directory, this starts the server. In order for the server to successfully serve the Stripe card field to the app's WebView, you have to have run `npm run build` at least once, so that there is a built directory to serve from.

### Troubleshooting

If you are making updates to `server.js`, you must restart the server to see your changes in action.
If you are making changes to the `src` directory files, you will need to run `npm run build` and refresh your WebView to see updates.
To see changes live in production, you will need to push your commits to your Heroku app with `git push heroku master` (this will automatically push your Master branch to your Heroku app's master branch)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
