import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => (
  <article className="cities__place-card place-card">
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={props.offer.imgSrc} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{props.offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark-active"></use>
          </svg>
          <span className="visually-hidden">In bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${props.offer.rating * 20}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#" onClick={props.onClick}>{props.offer.title}</a>
      </h2>
      <p className="place-card__type">{props.offer.type}</p>
    </div>
  </article>
);

Card.propTypes = {
  offer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
    type: PropTypes.oneOf([`Apartment`, `Private room`]).isRequired,
    imgSrc: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

export default Card;
