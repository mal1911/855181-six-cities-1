import React from 'react';
import PropTypes from 'prop-types';
import City from '../city/city';

const Cities = (props) => {
  const isActiveItem = (city) => (city === props.activeCity);

  const cities = props.citiesData.map((city, index) =>
    <City
      key={index}
      city={city}
      isActive={isActiveItem(city)}
      onClick={props.onCityClick}
    />
  );

  return <ul className="locations__list tabs__list">
    {cities}
  </ul>;
};

Cities.propTypes = {
  citiesData: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export default Cities;

