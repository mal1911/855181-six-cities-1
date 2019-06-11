import React from "react";
import PropTypes from "prop-types";
import {cityType} from "../../../prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../../reducer/offers-data/offers-data";
import {getCitiesData, getActiveCityIndex} from "../../../reducer/offers-data/selectors";
import City from "../city/index";

const Cities = (props) => {
  const isActiveItem = (index) => (index === props.activeCityIndex);

  const handleChange = (cityObj) => {
    props.onCityClick(props.citiesData.indexOf(cityObj));
  };

  const cities = props.citiesData.map((cityObj, index) =>
    <City
      key={index}
      cityObj={cityObj}
      isActive={isActiveItem(index)}
      onClick={handleChange}
    />
  );

  return <ul className="locations__list tabs__list">{cities}</ul>;
};

Cities.propTypes = {
  citiesData: PropTypes.arrayOf(cityType.isRequired).isRequired,
  activeCityIndex: PropTypes.number.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  citiesData: getCitiesData(state),
  activeCityIndex: getActiveCityIndex(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (index) => {
    dispatch(ActionCreator.changeActiveCityIndex(index));
  },
});

export {Cities};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
