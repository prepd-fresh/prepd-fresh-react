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
    cart: [],
    checkoutIsOpen: false
  }

  componentDidMount() {
    fetch('/api')
        .then(response => response.json())
        .then(initialState => this.setState(initialState))
  }

  updateValueOf = key => value => this.setState({[key]: value})

  toggleValueOf = key => () => this.setState(prevState => ({[key]: !prevState[key]}))

  render() {
    const {state, toggleValueOf} = this;
    const handleCheckoutPanelToggle = toggleValueOf('checkoutIsOpen');

    return (
      <BrowserRouter>
        <div className="App">
          <NavMenu {...{handleCheckoutPanelToggle}} />
          <main>
            <Switch>
              <Route path="/" exact render={props => <Home {...{...props, ...state}} />} />
              <Route path="/menu/" render={props => <Menu {...{...props, ...state}} />} />
              <Route render={() => <h2>404: Page not found</h2>} />
            </Switch>
            {state.checkoutIsOpen && <Checkout {...state} />}
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
