import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import NavMenu from './NavMenu';
import Footer from './Footer';
import Menu from './Menu/Menu';
import Checkout from './Checkout';
import dummyData from '../dummyData';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavMenu />
        <Route path="/" exact render={props => <Home {...{...props, ...dummyData}} />} />
        <Route path="/menu/" render={props => <Menu {...{...props, ...dummyData}} />} />
        <Route path="/checkout/" render={props => <Checkout {...{...props, ...dummyData}} />} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
