import React from 'react';
import PropTypes from 'prop-types';
import City from '../city/city';

const Cities = (props) => {
  const isActiveItem = (city) => (city === props.activeCity);

  const cities = props.citiesData.map((cityObj, index) =>
    <City
      key={index}
      city={cityObj.name}
      isActive={isActiveItem(cityObj.name)}
      onClick={props.onCityClick}
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
  activeCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export default Cities;

