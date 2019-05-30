import React from 'react';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import Header from '../header/header';
import CardsWrapper from '../cards-wrapper/cards-wraqpper';
import Cities from '../cities/cities';
import Map from '../map/map';

const App = () => {
  const ActivatedCities = withActiveItem(Cities, 0);

  return (<div>
    <Header/>
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities tabs">
        <section className="locations container">
          <ActivatedCities/>
        </section>
      </div>
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <CardsWrapper/>
          <div className="cities__right-section">
            <Map/>
          </div>
        </div>
      </div>
    </main>
  </div>);
};

export default App;
