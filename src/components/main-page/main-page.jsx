import React from 'react';
import Header from '../header/';
import CardsWrapper from '../cards-wrapper/cards-wraqpper';
import Cities from '../cities/cities';
import Map from '../map/map';
import withActiveItem from "../../hocs/with-active-item/with-active-item";

const MainPage = () => {
  document.body.classList.add(`page--main`);
  const ActivatedCities = withActiveItem(Cities, 0);
  return <React.Fragment>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
      integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
      crossOrigin=""/>
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
  </React.Fragment>;
};

MainPage.propTypes = {
};

export default MainPage;
