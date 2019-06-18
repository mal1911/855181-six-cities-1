import React from "react";
import PropTypes from "prop-types";
import {offerType} from "../../prop-types";
import {NavLink} from "react-router-dom";
import "./card.css";

const Card = ({offerObj, onChange, onButtonClick, cardClassName}) => {

  const isPremium = () => {
    return offerObj.isPremium
      ? <div className="place-card__mark">
        <span>Premium</span>
      </div>
      :
      null;
  };

  const hangleImageClick = (evt) => {
    if (onChange) {
      onChange(offerObj);
    }
    evt.preventDefault();
  };

  const hangleTitleClick = () => {
    if (onChange) {
      onChange(offerObj);
    }
  };

  const hangleButtonClick = (evt) => {
    if (onButtonClick) {
      onButtonClick(offerObj);
    }
    evt.preventDefault();
  };

  return <article className={`${cardClassName}__place-card place-card`}>
    <div className={`${cardClassName}__image-wrapper place-card__image-wrapper`}>
      <a href="#" onClick={hangleImageClick}>
        <img className="place-card__image" src={offerObj.previewImage} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    {isPremium()}
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offerObj.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button
          className={`place-card__bookmark-button  ${offerObj.isFavorite ? `place-card__bookmark-button--active` : ``}  button`}
          type="button"
          onClick={hangleButtonClick}
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">In bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${Math.round(offerObj.rating) * 20}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <NavLink
          onClick={hangleTitleClick}
          to={`/offer/${offerObj.id}`}>{offerObj.title}</NavLink>
      </h2>
      <p className="place-card__type">{offerObj.type}</p>
    </div>
  </article>;
};

Card.propTypes = {
  offerObj: offerType.isRequired,
  cardClassName: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onButtonClick: PropTypes.func,
};

export default Card;
