import React from 'react';
import PropTypes from 'prop-types';
import City from '../city/city';

const Cities = (props) => {
  const isActiveItem = (index) => (index === props.activeItem);

  const handlerChange = (cityObj) => {
    props.onCityClick(cityObj.name);
    /*
    props.setActiveItem(citiesData.indexOf(cityObj));
    */
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

export default Cities;
