import React from "react";
import Cards from "../cards";
import CardsHeader from "../cards-header";
import PopupSortingElement from "../pupup-sorting-element/popup-sorting-element";
import withPopupToggle from "../../../hocs/with-popup-toggle/with-popup-toggle";
import Map from "../../map";

const PlacesWrapperData = () => {
  const TogglePopupSortingElement = withPopupToggle(PopupSortingElement);

  return <React.Fragment>
    <div className="cities__places-wrapper">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <CardsHeader/>
          <TogglePopupSortingElement/>
          <Cards/>
        </section>
        <div className="cities__right-section">
          <Map className={`cities__map`}/>
        </div>
      </div>
    </div>
  </React.Fragment>;
};

export default PlacesWrapperData;
