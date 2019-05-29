import React from 'react';
import PropTypes from 'prop-types';
import {offerType} from '../../prop-types';
import Card from '../card/card';
import {connect} from "react-redux";
import {getResultOffersData} from '../../reducer/data/selectors';

const Cards = (props) => {
  const handlerChange = (cardObj) => {
    props.setActiveItem(cardObj.id);
  };

  const cards = props.filteredOffersData.map((offerObj, index) =>
    <Card key={index} offerObj={offerObj} onChange={handlerChange}/>);

  return <div className="cities__places-list places__list tabs__content">
    {cards}
  </div>;
};

Cards.propTypes = {
  filteredOffersData: PropTypes.arrayOf(offerType.isRequired).isRequired,
  //activeCity: PropTypes.string.isRequired,
  activeItem: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  //activeCity: state.activeCity,
  //filteredOffersData: state.filteredOffersData,
  filteredOffersData: getResultOffersData(state),
});

export {Cards};
export default connect(mapStateToProps)(Cards);
