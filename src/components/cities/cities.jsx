import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer';
import City from '../city/city';

const Cities = (props) => {
  const isActiveItem = (index) => (index === props.activeItem);

  const handlerChange = (cityObj) => {
    props.onCityClick(cityObj.name);
    props.setActiveItem(props.citiesData.indexOf(cityObj));
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
  citiesData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.array.isRequired.isRequired}).isRequired).isRequired,
  onCityClick: PropTypes.func.isRequired,
  activeItem: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  citiesData: state.citiesData,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (activeCity) => {
    dispatch(ActionCreator.changeActiveCity(activeCity));
  },
});

export {Cities};
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
