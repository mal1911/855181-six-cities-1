import React from 'react';
import PropTypes from 'prop-types';
import City from '../city/city';

const Cities = (props) => {
  const isActiveItem = (cityObj) => (cityObj.id === props.activeCityId);

  const cities = props.citiesData.map((cityObj, index) =>
    <City
      key={index}
      cityObj={cityObj}
      isActive={isActiveItem(cityObj)}
      onClick={props.onCityClick}
    />
  );

  return <ul className="locations__list tabs__list">
    {cities}
  </ul>;
};

Cities.propTypes = {
  citiesData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired),
  activeCityId: PropTypes.number.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export default Cities;

