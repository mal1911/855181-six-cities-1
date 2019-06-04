import React from "react";
import CardsWrapper from "../cards-wrapper/cards-wraqpper";
import Map from "../map/map";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCountResultOffers, getActiveCityName} from "../../reducer/data/selectors";

const PlasesWrapper = (props) => {
  return props.countResultOffers
    ?
    <React.Fragment>
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <CardsWrapper/>
          <div className="cities__right-section">
            <Map/>
          </div>
        </div>
      </div>
    </React.Fragment>
    :
    <React.Fragment>
      <div className="cities__places-wrapper">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property availbale at the moment in
                {props.activeCityName}</p>
            </div>
          </section>
          <div className="cities__right-section">
          </div>
        </div>
      </div>
    </React.Fragment>;
};

PlasesWrapper.propTypes = {
  countResultOffers: PropTypes.number.isRequired,
  activeCityName: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  countResultOffers: getCountResultOffers(state),
  activeCityName: getActiveCityName(state),
});

export {PlasesWrapper};

export default connect(mapStateToProps)(PlasesWrapper);
