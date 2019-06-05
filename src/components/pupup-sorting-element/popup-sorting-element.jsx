import React from 'react';
import PropTypes from 'prop-types';
import {ESC_KEYCODE, SORTING_TYPES} from '../../constants';
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/offers-data/offers-data';

const PopupSortingElement = (props) => {

  const handlerChangeActiveItem = (evt) => {
    const index = SORTING_TYPES.indexOf(evt.target.textContent);
    props.onOrderClick(index);
    props.setActiveItem(index);
    props.onToggle();
    evt.preventDefault();
  };

  const handlerKeyDown = (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      props.onToggle();
      evt.preventDefault();
    }
  };

  return <form className="places__sorting" action="#" method="get" onKeyDown={handlerKeyDown}>
    <span className="places__sorting-caption">Sort by &nbsp;</span>
    <span className="places__sorting-type" tabIndex="0" onClick={handlerChangeActiveItem}>
      {SORTING_TYPES[props.activeItem]}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className={`places__options places__options--custom ${props.opened ? ` places__options--opened ` : null}`}>
      {SORTING_TYPES.map((type, index) =>
        <li key={index} className= {`places__option ${props.activeItem === index ? ` places__option--active` : null}`} tabIndex="0" onClick={handlerChangeActiveItem}>{type}</li>)}
    </ul>
  </form>;
};

PopupSortingElement.propTypes = {
  opened: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  activeItem: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  onOrderClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onOrderClick: (index) => {
    dispatch(ActionCreator.changeActiveOrderIndex(index));
  },
});

export {PopupSortingElement};
export default connect(null, mapDispatchToProps)(PopupSortingElement);


