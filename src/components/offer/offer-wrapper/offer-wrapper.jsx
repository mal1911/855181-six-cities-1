import React from "react";
import {offerType} from "../../../prop-types";
import {getRandomArray} from "../../../util";
import OfferComments from "../offer-comments";
import Map from "../../map";
import OfferCard from "../offer-card";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getNearData} from "../../../reducer/offers-data/selectors";
import {Operation} from "../../../reducer/offers-data/offers-data";


const OfferWrapper = ({offerObj, nearData}) => {
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

  const nearCards = nearData.map((obj, index) =>
    <OfferCard key={index} offerObj={obj}/>);


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
            <button
              className="property__bookmark-button button /*place-card__bookmark-button--active*/"
              type="button"
              onClick={props.onChangeFavoriteStatus(offerObj.id, 0)}>
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
        <Map className={`property__map`}/>
      </div>
    </section>
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {nearCards}
        </div>
      </section>
    </div>
  </main>;
};

OfferWrapper.propTypes = {
  offerObj: offerType.isRequired,
  nearData: PropTypes.arrayOf(offerType),
  onChangeFavoriteStatus: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  nearData: getNearData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeFavoriteStatus: (id, status) => {
    dispatch(Operation.changeFavoriteStatus(id, status));
  },
});

export {OfferWrapper};

export default connect(mapStateToProps, mapDispatchToProps)(OfferWrapper);
