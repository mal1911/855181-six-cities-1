import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';

const Cards = (props) => {

  const handlerChange = (cardObj) => {
    props.setActiveItem(cardObj.id);
  };

  const cards = props.offersData.map((offerObj, index) =>
    <Card key={index} offerObj={offerObj} onChange={handlerChange}/>);

  return <div className="cities__places-list places__list tabs__content">
    {cards}
  </div>;
};

Cards.propTypes = {
  offersData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    city: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
    type: PropTypes.oneOf([`Apartment`, `Private room`]).isRequired,
    imgSrc: PropTypes.string.isRequired,
  }).isRequired),
  activeItem: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

export default Cards;
