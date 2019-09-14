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
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <div className={props.className}>
        <NavMenu />
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
  * {
    box-sizing: border-box;
  }

  background-color: #FAF8F4; 
  min-height: 100vh;
  padding-top: 40px;

  main {
    position: relative;
  }

  main > * {
    width: 320px;
    margin: auto;
    height: auto;
  }

  .NavMenu {
    height: 40px;
  }

  @media screen and (min-width: 1024px) {
    main > *{
      width: 1024px;
    }

    .NavMenu {
      height: 60px;
    }
  }

  .Footer {
    height: 40px;
    background-color: #3E444B;
  }
`;
