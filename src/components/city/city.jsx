import React from 'react';
import PropTypes from 'prop-types';

const City = (props) => {
  const handlerClick = (evt) => {
    props.onClick(evt, props.cityObj);
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default City;
