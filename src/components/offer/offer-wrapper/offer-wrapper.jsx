import React from "react";
import {offerType} from "../../../prop-types";
import {getRandomArray} from "../../../util";
import OfferComments from "../offer-comments";

const OfferWrapper = ({offerObj}) => {
  const MAX_OFFER_IMAGES = 6;

  const imgs = getRandomArray(offerObj.images, MAX_OFFER_IMAGES).map((imageSrc, index) => <div key={index} className="property__image-wrapper">
    <img className="property__image" src={imageSrc} alt="Photo studio"/>
  </div>);

  const isPremium = () => {
    return offerObj.isPremium
      ? <div className="property__mark">
        <span>Premium</span>
      </div>
      :
      null;
  };
  const rating = Math.round(offerObj.rating);
  const insides = offerObj.goods.map((good, index) => <li key={index} className="property__inside-item">{good}</li>);
  const userStatus = offerObj.host.isPro ? `Pro` : ``;
  const userStatusClassName = offerObj.host.isPro ? `property__avatar-wrapper--pro` : ``;

  return <main className="page__main page__main--property">
    <section className="property">
      <div className="property__gallery-container container">
        <div className="property__gallery">
          {imgs}
        </div>
      </div>;
      <div className="property__container container">
        <div className="property__wrapper">
          {isPremium()}
          <div className="property__name-wrapper">
            <h1 className="property__name">
              {offerObj.title}
            </h1>
            <button className="property__bookmark-button button" type="button">
              <svg className="property__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={{width: `${rating * 20}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="property__rating-value rating__value">{rating}</span>
          </div>
          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              Entire {offerObj.type}
            </li>
            <li className="property__feature property__feature--bedrooms">
              {offerObj.bedrooms} Bedrooms
            </li>
            <li className="property__feature property__feature--adults">
              Max {offerObj.maxAdults} adults
            </li>
          </ul>
          <div className="property__price">
            <b className="property__price-value">&euro;{offerObj.price}</b>
            <span className="property__price-text">&nbsp;night</span>
          </div>
          <div className="property__inside">
            <h2 className="property__inside-title">What&apos;s inside</h2>
            <ul className="property__inside-list">{insides}</ul>
          </div>
          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              <div className={`property__avatar-wrapper ${userStatusClassName} user__avatar-wrapper`}>
                <img className="property__avatar user__avatar" src={`/${offerObj.host.avatarUrl}`} width="74" height="74" alt="Host avatar"/>
              </div>
              <span className="property__user-name">{offerObj.host.name}</span>
              <span className="property__user-status">{userStatus}</span>
            </div>
            <div className="property__description">
              <p className="property__text">{offerObj.description}</p>
            </div>
          </div>
          <OfferComments offerObj={offerObj} />
        </div>
      </div>
      <section className="property__map map"></section>
    </section>
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          <article className="near-places__card place-card">
            <div className="near-places__image-wrapper place-card__image-wrapper">
              <a href="#">
                <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place image"/>
              </a>
            </div>
            <div className="place-card__info">
              <div className="place-card__price-wrapper">
                <div className="place-card__price">
                  <b className="place-card__price-value">&euro;80</b>
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
                  <span style={{width: `80%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <h2 className="place-card__name">
                <a href="#">Wood and stone place</a>
              </h2>
              <p className="place-card__type">Private room</p>
            </div>
          </article>

          <article className="near-places__card place-card">
            <div className="near-places__image-wrapper place-card__image-wrapper">
              <a href="#">
                <img className="place-card__image" src="img/apartment-02.jpg" width="260" height="200" alt="Place image"/>
              </a>
            </div>
            <div className="place-card__info">
              <div className="place-card__price-wrapper">
                <div className="place-card__price">
                  <b className="place-card__price-value">&euro;132</b>
                  <span className="place-card__price-text">&#47;&nbsp;night</span>
                </div>
                <button className="place-card__bookmark-button button" type="button">
                  <svg className="place-card__bookmark-icon" width="18" height="19">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="place-card__rating rating">
                <div className="place-card__stars rating__stars">
                  <span style={{width: `80%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <h2 className="place-card__name">
                <a href="#">Canal View Prinsengracht</a>
              </h2>
              <p className="place-card__type">Apartment</p>
            </div>
          </article>

          <article className="near-places__card place-card">
            <div className="near-places__image-wrapper place-card__image-wrapper">
              <a href="#">
                <img className="place-card__image" src="img/apartment-03.jpg" width="260" height="200" alt="Place image"/>
              </a>
            </div>
            <div className="place-card__info">
              <div className="place-card__price-wrapper">
                <div className="place-card__price">
                  <b className="place-card__price-value">&euro;180</b>
                  <span className="place-card__price-text">&#47;&nbsp;night</span>
                </div>
                <button className="place-card__bookmark-button button" type="button">
                  <svg className="place-card__bookmark-icon" width="18" height="19">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="place-card__rating rating">
                <div className="place-card__stars rating__stars">
                  <span style={{width: `100%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <h2 className="place-card__name">
                <a href="#">Nice, cozy, warm big bed apartment</a>
              </h2>
              <p className="place-card__type">Apartment</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  </main>;
};

OfferWrapper.propTypes = {
  offerObj: offerType.isRequired,
};

export default OfferWrapper;
