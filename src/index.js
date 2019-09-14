import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import preloadedState from './preloadedState';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider, useSelector } from 'react-redux';
import prepdApp from './reducers';import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  h1, h2, h3, h4, h5, h6, p {
    color: #3E444B;
  }
  body {
    min-height: 100vh;
  }

  body, html {
    overflow: ${props => props.cartIsVisible ? 'hidden' : 'auto'}
  }
}
`

const store = createStore(
    prepdApp,
    preloadedState
)

const StyledApp = props => {
  const cartIsVisible = useSelector(state => state.cartIsVisible);
  return (
      <React.Fragment>
        <GlobalStyle {...{cartIsVisible}} />
        <App />
      </React.Fragment>
  );
}

ReactDOM.render(
    <Provider store={store}>,
      <StyledApp />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
