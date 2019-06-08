import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getActiveCityName} from "../../../reducer/offers-data/selectors";

const PlacesWrapperEmpty = (props) =>
  (<React.Fragment>
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
  </React.Fragment>);

PlacesWrapperEmpty.propTypes = {
  activeCityName: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCityName: getActiveCityName(state),
});

export {PlacesWrapperEmpty};

export default connect(mapStateToProps)(PlacesWrapperEmpty);
