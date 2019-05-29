import React from 'react';
import PropTypes from 'prop-types';
import {offerType} from '../../prop-types';

const Card = (props) => {
  const handlerChange = (evt) => {
    props.onChange(props.offerObj);
    evt.preventDefault();
  };

  return <article className="cities__place-card place-card">
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#" onMouseEnter={handlerChange}>
        <img className="place-card__image" src={props.offerObj[`preview_image`]} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{props.offerObj.price}</b>
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
          <span style={{width: `${props.offerObj.rating * 20}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#" onClick={handlerChange}>{props.offerObj.title}</a>
      </h2>
      <p className="place-card__type">{props.offerObj.type}</p>
    </div>
  </article>;
};

Card.propTypes = {
  offerObj: offerType.isRequired,
  onChange: PropTypes.func,
};

export default Card;
