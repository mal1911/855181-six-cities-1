import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import {connect} from "react-redux";

const Cards = (props) => {

  const handlerChange = (cardObj) => {
    props.setActiveItem(cardObj.id);
  };

  const cards = props.filteredOffersData.map((offerObj, index) =>
    <Card key={index} offerObj={offerObj} onChange={handlerChange}/>);

  return <section className="cities__places places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{props.filteredOffersData.length} places to stay in {props.activeCity}</b>
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0">
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        <li className="places__option places__option--active" tabIndex="0">Popular</li>
        <li className="places__option" tabIndex="0">Price: low to high</li>
        <li className="places__option" tabIndex="0">Price: high to low</li>
        <li className="places__option" tabIndex="0">Top rated first</li>
      </ul>
    </form>
    <div className="cities__places-list places__list tabs__content">
      {cards}
    </div>
  </section>;
};

Cards.propTypes = {
  filteredOffersData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    city: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
    type: PropTypes.oneOf([`Apartment`, `Private room`]).isRequired,
    imgSrc: PropTypes.string.isRequired,
  }).isRequired),
  activeCity: PropTypes.string.isRequired,
  activeItem: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.activeCity,
  filteredOffersData: state.filteredOffersData,
});

export {Cards};
export default connect(mapStateToProps)(Cards);
