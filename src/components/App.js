import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import NavMenu from './NavMenu';
import Footer from './Footer';

const Menu = () => (
  <div className="Menu">
    <h2>Menu</h2>
    <p>Choose from our weekly rotating selection of dishes!</p>
    <p>Meals are delivered every Sunday. The next delivery date is Sunday, July 28. Order by 11:59pm Friday, July 26 to receive your delivery this Sunday.</p>
    <MealCard />
    <MealCard />
    <MealCard />
  </div>
);

const MealCard = () => (
  <div className="MealCard">

  </div>
);

const Cart = () => <h2>Cart</h2>;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavMenu />
        <Route path="/" exact component={Home} />
        <Route path="/menu/" component={Menu} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
