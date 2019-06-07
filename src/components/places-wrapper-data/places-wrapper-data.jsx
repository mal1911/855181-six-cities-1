import React from "react";
import Cards from "../cards/cards";
import CardsHeader from "../cards-header/cards-header";
import PopupSortingElement from "../pupup-sorting-element/popup-sorting-element";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withPopupToggle from "../../hocs/with-popup-toggle/with-popup-toggle";
import Map from "../map/map";

const PlacesWrapperData = () => {
  const ActivatedPopupSortingElement = withActiveItem(withPopupToggle(PopupSortingElement), 0);
  const ActivatedCards = withActiveItem(Cards);

  return <React.Fragment>
    <div className="cities__places-wrapper">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <CardsHeader/>
          <ActivatedPopupSortingElement/>
          <ActivatedCards/>
        </section>
        <div className="cities__right-section">
          <Map/>
        </div>
      </div>
    </div>
  </React.Fragment>;
};

export default PlacesWrapperData;
