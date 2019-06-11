import React from "react";
import Header from "../../header/index";
import Cities from "../cities/cities";
import LeafletLink from "../../leaflet-link/leaflet-link";
import PlesesWrapper from "../places-wrapper/index";
import "./main-page.css";

const MainPage = () => {
  return <React.Fragment>
    <LeafletLink/>
    <Header/>
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities tabs">
        <section className="locations container">
          <Cities/>
        </section>
      </div>
      <PlesesWrapper/>
    </main>
  </React.Fragment>;
};

export default MainPage;
