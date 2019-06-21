import React from "react";
import Cards from "../cards";
import CardsHeader from "../cards-header";
import PopupSortingElement from "../pupup-sorting-element/popup-sorting-element";
import withPopupToggle from "../../../hocs/with-popup-toggle/with-popup-toggle";
import Map from "../../map";
import {connect} from "react-redux";
import {getOffersLocationsData} from "../../../reducer/data/selectors";
import {locationType} from "../../../prop-types";
import PropTypes from "prop-types";

const PlacesWrapperData = ({offersLocationsData}) => {
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
          <Map
            className={`cities__map`}
            offersLocationsData={offersLocationsData}
          />
        </div>
      </div>
    </div>
  </React.Fragment>;
};

PlacesWrapperData.propTypes = {
  offersLocationsData: PropTypes.arrayOf(PropTypes.shape({
    location: locationType.isRequired,
    isActive: PropTypes.bool
  })),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offersLocationsData: getOffersLocationsData(state),
});

export {PlacesWrapperData};

export default connect(mapStateToProps)(PlacesWrapperData);
