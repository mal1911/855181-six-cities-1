import React from 'react';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

import Cards from '../cards/cards';
import Cities from '../cities/cities';
import Map from '../map/map';

const App = () => {
  const ActivatedCards = withActiveItem(Cards);
  const ActivatedCities = withActiveItem(Cities, 0);

  return (<div>
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities tabs">
        <section className="locations container">
          <ActivatedCities/>
        </section>
      </div>
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <ActivatedCards/>
          <div className="cities__right-section">
            <Map/>
          </div>
        </div>
      </div>
    </main>
  </div>);
};

export default App;
