import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import Cards from '../cards/cards';
import Cities from '../cities/cities';
import Map from '../map/map';

const App = (props) => {
  const offersCoordinatesData = props.filteredOffersData.map((offerObj) => offerObj.coordinates);
  const cityCoordinates = props.citiesData.find((cityObj) => cityObj.name === props.activeCity).coordinates;
  return <div>
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
          <Cities
            citiesData={props.citiesData}
            activeCity={props.activeCity}
            onCityClick={props.onCityClick}
          />
        </section>
      </div>
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{props.filteredOffersData.length} places to stay in {props.activeCity}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex="0">
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex="0">Popular</li>
                <li className="places__option" tabIndex="0">Price: low to high</li>
                <li className="places__option" tabIndex="0">Price: high to low</li>
                <li className="places__option" tabIndex="0">Top rated first</li>
              </ul>
            </form>
            <Cards offersData={props.filteredOffersData}/>
          </section>
          <div className="cities__right-section">
            <Map
              offersCoordinatesData={offersCoordinatesData}
              cityCoordinates={cityCoordinates}
            />
          </div>
        </div>
      </div>
    </main>
  </div>;
};

App.propTypes = {
  activeCity: PropTypes.string.isRequired,
  filteredOffersData: PropTypes.array.isRequired,
  citiesData: PropTypes.array.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.activeCity,
  filteredOffersData: state.filteredOffersData,
  citiesData: state.citiesData,
});

const mapDispatchToProps = (dispatch) => ({

  onCityClick: (evt, activeCity) => {
    dispatch(ActionCreator.changeActiveCity(activeCity));
  },

  /*
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),

  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(userAnswer, question, mistakes, maxMistakes));
  }*/
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);


