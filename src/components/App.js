import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import NavMenu from './NavMenu';
import Footer from './Footer';
import Menu from './Menu/Menu';

const dummyData = {
  heroImageUrl: 'Photo-by-Daniel-Park-on-Unsplash.jpg',
  infoCards: [
    {
      imageUrl: 'Photo-by-Megan-Hodges-on-Unsplash.jpg',
      hed: 'A menu that updates every week',
      dek: 'Every week features a fresh menu, to keep your tastebuds happy!'
    },
    {
      imageUrl: 'Photo-by-Suhyeon-Choi-on-Unsplash.jpg',
      hed: 'A menu that updates every week',
      dek: 'Every week features a fresh menu, to keep your tastebuds happy!'
    },
    {
      imageUrl: 'Photo-by-Fabian-Blank-on-Unsplash.jpg',
      hed: 'A menu that updates every week',
      dek: 'Every week features a fresh menu, to keep your tastebuds happy!'
    },
  ],
  testimonialHeadingImgUrl: 'Photo-by-Katherine-Chase-on-Unsplash.jpg',
  testimonials: [
    {
      imageUrl: 'testimonials-1.jpg',
      name: 'Firstname L.',
      quote: 'This space is reserved for a quote from one of our users!'
    },
    {
      imageUrl: 'testimonials-2.jpg',
      name: 'Firstname L.',
      quote: 'This space is reserved for a quote from one of our users!'
    },
    {
      imageUrl: 'testimonials-3.jpg',
      name: 'Firstname L.',
      quote: 'This space is reserved for a quote from one of our users!'
    },
  ],
  sliderImgUrl: 'Photo-by-yvonne-lee-harijanto-on-Unsplash.jpg'

}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavMenu />
        <Route path="/" exact render={(props) => <Home {...{...props, ...dummyData}} />} />
        <Route path="/menu/" component={Menu} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
