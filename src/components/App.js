import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions';
import './App.css';
import Home from './Home/Home';
import NavMenu from './NavMenu';
import Footer from './Footer';
import Menu from './Menu/Menu';
import Checkout from './Checkout/Checkout';

const App = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  // componentDidMount() {
  //   fetch('/api')
  //       .then(response => response.json())
  //       .then(initialState => this.setState(initialState))
  // }

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
          {state.cartIsVisible && <Checkout {...state} />}
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
