import React from "react";
import {offerType} from "../../../prop-types";

const OfferCard = ({offerObj}) => {
  const hangleClick = (evt) => {
    evt.preventDefault();
  };

  return <article className="near-places__card place-card">
    <div className="near-places__image-wrapper place-card__image-wrapper">
      <a href="#" onClick={hangleClick}>
        <img className="place-card__image" src={offerObj.previewImage} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offerObj.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
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
        <a href="#" onClick={hangleClick}>{offerObj.title}</a>
      </h2>
      <p className="place-card__type">{offerObj.type}</p>
    </div>
  </article>;
};

OfferCard.propTypes = {
  offerObj: offerType.isRequired,
};

export default OfferCard;
