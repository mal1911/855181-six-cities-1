import React from 'react';
import PropTypes from 'prop-types';

const City = (props) => {
  const handlerClick = (evt) => {
    props.onClick(evt, props.city);
  };

  const classList = [`locations__item-link`, `tabs__item`];
  if (props.isActive) {
    classList.push(`tabs__item--active`);
  }

  return <li className="locations__item">
    <a className={classList.join(` `)} href="#" onClick={handlerClick}>
      <span>{props.city}</span>
    </a>
  </li>;
};

City.propTypes = {
  city: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default City;
