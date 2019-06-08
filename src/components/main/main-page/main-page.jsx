import React from "react";
import Header from "../../header/index";
import Cities from "../cities/cities";
import LeafletLink from "../../leaflet-link/leaflet-link";
import withActiveItem from "../../../hocs/with-active-item/with-active-item";
import PlesesWrapper from "../places-wrapper/index";
import "./main-page.css";

const MainPage = () => {
  const ActivatedCities = withActiveItem(Cities, 0);
  return <React.Fragment>
    <LeafletLink/>
    <Header/>
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities tabs">
        <section className="locations container">
          <ActivatedCities/>
        </section>
      </div>
      <PlesesWrapper/>
    </main>
  </React.Fragment>;
};

export default MainPage;
