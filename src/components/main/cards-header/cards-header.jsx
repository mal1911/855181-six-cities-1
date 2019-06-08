import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getActiveCityName, getCountResultOffers} from '../../../reducer/offers-data/selectors';

const CardsHeader = (props) => {
  return <React.Fragment>
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{props.countResultOffers} places to stay in {props.activeCityName}</b>
  </React.Fragment>;
};

CardsHeader.propTypes = {
  activeCityName: PropTypes.string.isRequired,
  countResultOffers: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCityName: getActiveCityName(state),
  countResultOffers: getCountResultOffers(state)
});

export {CardsHeader};
export default connect(mapStateToProps)(CardsHeader);
