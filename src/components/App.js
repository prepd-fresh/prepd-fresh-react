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

const App = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <div className="App">
        <NavMenu />
        <main>
          <Switch>
            <Route 
              path="/" 
              exact 
              render={props => <Home {...{...props, ...state}} />} />
            <Route path="/menu/" render={props => <Menu {...props} />} />
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

  body {
    background-color: #FAF8F4; 
    min-height: 100vh;
  }

  main {
    position: relative;
  }

  main > * {
    width: 320px;
    border: 1px solid red;
    margin: auto;
    height: auto;
  }

  .NavMenu {
    height: 40px;
    border: 1px solid blue;
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
    border: 1px solid blue;
  }
`;
