import React from 'react';
import PropTypes from 'prop-types';
import {ESC_KEYCODE, SORTING_TYPES} from '../../../constants';
import {connect} from "react-redux";
import {ActionCreator} from '../../../reducer/data/data';
import {getActiveOrderIndex} from "../../../reducer/data/selectors";

const PopupSortingElement = (props) => {

  const handleChangeActiveItem = (evt) => {
    props.onOrderClick(SORTING_TYPES.indexOf(evt.target.textContent));
    props.onToggle();
    evt.preventDefault();
  };

  const handleKeyDown = (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      props.onToggle();
      evt.preventDefault();
    }
  };

  return <form className="places__sorting" action="#" method="get" onKeyDown={handleKeyDown}>
    <span className="places__sorting-caption">Sort by &nbsp;</span>
    <span className="places__sorting-type" tabIndex="0" onClick={handleChangeActiveItem}>
      {SORTING_TYPES[props.activeOrderIndex]}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className={`places__options places__options--custom ${props.opened ? ` places__options--opened ` : null}`}>
      {SORTING_TYPES.map((type, index) =>
        <li key={index} className= {`places__option ${props.activeOrderIndex === index ? ` places__option--active` : null}`} tabIndex="0" onClick={handleChangeActiveItem}>{type}</li>)}
    </ul>
  </form>;
};

PopupSortingElement.propTypes = {
  opened: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  activeOrderIndex: PropTypes.number.isRequired,
  onOrderClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeOrderIndex: getActiveOrderIndex(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOrderClick: (index) => {
    dispatch(ActionCreator.changeActiveOrderIndex(index));
  },
});

export {PopupSortingElement};

export default connect(mapStateToProps, mapDispatchToProps)(PopupSortingElement);
