import React from 'react';
import PropTypes from 'prop-types';
import {cityType} from '../../prop-types';
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/data/data';
import {getCitiesData} from '../../reducer/data/selectors';
import City from '../city/city';

const Cities = (props) => {
  const isActiveItem = (index) => (index === props.activeItem);

  const handlerChange = (cityObj) => {
    const activeCityIndex = props.citiesData.indexOf(cityObj);
    props.onCityClick(activeCityIndex);
    props.setActiveItem(activeCityIndex);
  };

  const cities = props.citiesData.map((cityObj, index) =>
    <City
      key={index}
      cityObj={cityObj}
      isActive={isActiveItem(index)}
      onClick={handlerChange}
    />
  );

  return <ul className="locations__list tabs__list">
    {cities}
  </ul>;
};

Cities.propTypes = {
  citiesData: PropTypes.arrayOf(cityType.isRequired).isRequired,
  onCityClick: PropTypes.func.isRequired,
  activeItem: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  citiesData: getCitiesData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (index) => {
    dispatch(ActionCreator.changeActiveCityIndex(index));
  },
});

export {Cities};
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
