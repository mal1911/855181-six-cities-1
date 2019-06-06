import React from "react";
import CardsWrapper from "../cards-wrapper/cards-wrapper";
import Map from "../map/map";

const PlasesWrapperData = () =>
  (<React.Fragment>
    <div className="cities__places-wrapper">
      <div className="cities__places-container container">
        <CardsWrapper/>
        <div className="cities__right-section">
          <Map/>
        </div>
      </div>
    </div>
  </React.Fragment>);

export default PlasesWrapperData;
