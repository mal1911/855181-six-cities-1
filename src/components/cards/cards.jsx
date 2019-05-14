import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';

const Cards = (props) => {
  const cards = props.offers.map((offer, index) => {
    return <Card key={index} offer={offer} onClick={props.onClick}/>;
  });

  return <div className="cities__places-list places__list tabs__content">
    {cards}
  </div>;
};

Cards.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
    type: PropTypes.oneOf([`Apartment`, `Private room`]).isRequired,
    imgSrc: PropTypes.string.isRequired,
  }).isRequired),
  onClick: PropTypes.func,
};

export default Cards;
