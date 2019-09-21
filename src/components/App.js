import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions';
import Home from './Home/Home';
import NavMenu from './NavMenu';
import Footer from './Footer';
import Menu from './Menu/Menu';
import Checkout from './Checkout/Checkout';
import styled from 'styled-components';

const App = props => {
  const state = useSelector(state => state);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <div className={props.className}>
        <NavMenu cartItemCount={Object.values(cart).reduce(
          (total, val) => total + val.qty,
          0
        )} />
        <main>
          <Switch>
            <Route 
              path="/" 
              exact 
              render={props => <Home {...{...props, ...state}} />} />
            <Route path="/meals/" render={props => <Menu {...props} />} />
            <Route render={() => <h2>404: Page not found</h2>} />
          </Switch>
          <Checkout cartIsVisible={state.cartIsVisible} />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default styled(App)`

  background-color: #FAF8F4; 
  min-height: 100vh;
  padding-top: 40px;

  main {
    position: relative;
    min-height: calc(100vh - 100px)
  }

  main > * {
    margin: auto;
    height: auto;
  }

  .NavMenu {
    height: 40px;
  }

  @media screen and (min-width: 1024px) {
    main > *{
      ${'' /* width: 1024px; */}
    }

    .NavMenu {
      height: 60px;
    }
  }

  .Footer {
    height: 40px;
    background-color: #3E444B;
    z-index: 1;
    width: 100%;
  }
`;
