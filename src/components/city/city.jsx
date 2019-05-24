import React from 'react';
import PropTypes from 'prop-types';

const City = (props) => {
  const handlerClick = (evt) => {
    props.onClick(props.cityObj);
    evt.preventDefault();
  };

  const classList = [`locations__item-link`, `tabs__item`];
  if (props.isActive) {
    classList.push(`tabs__item--active`);
  }

  return <li className="locations__item">
    <a className={classList.join(` `)} href="#" onClick={handlerClick}>
      <span>{props.cityObj.name}</span>
    </a>
  </li>;
};

City.propTypes = {
  cityObj: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.array.isRequired.isRequired}).isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default City;
