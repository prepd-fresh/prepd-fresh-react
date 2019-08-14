import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import NavMenu from './NavMenu';
import Footer from './Footer';
import Menu from './Menu';

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
