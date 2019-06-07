import React from 'react';
import PropTypes from 'prop-types';
import {cityType} from "../../prop-types";

const City = ({cityObj, isActive, onClick}) => {
  const handlerClick = (evt) => {
    onClick(cityObj);
    evt.preventDefault();
  };

  const activeClassName = isActive ? `tabs__item--active` : ``;

  return <li className="locations__item">
    <a className={`locations__item-link ${activeClassName} tabs__item`} href="#" onClick={handlerClick}>
      <span>{cityObj.name}</span>
    </a>
  </li>;
};

City.propTypes = {
  cityObj: cityType.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default City;
