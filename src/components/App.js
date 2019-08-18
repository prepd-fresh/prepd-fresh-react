import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import NavMenu from './NavMenu';
import Footer from './Footer';
import Menu from './Menu/Menu';
import Checkout from './Checkout';

class App extends React.Component {
  state = {
    heroImageUrl: '',
    infoCards: [],
    testimonialHeadingImgUrl: '',
    testimonials: [],
    sliderImgUrl: '',
    products: {},
    cart: []
  }

  componentDidMount() {
    fetch('/api')
        .then(response => response.json())
        .then(initialState => this.setState(initialState))
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavMenu />
          <Switch>
            <Route path="/" exact render={props => <Home {...{...props, ...this.state}} />} />
            <Route path="/menu/" render={props => <Menu {...{...props, ...this.state}} />} />
            <Route path="/checkout/" render={props => <Checkout {...{...props, ...this.state}} />} />
            <Route render={() => <h2>404: Page not found</h2>} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
