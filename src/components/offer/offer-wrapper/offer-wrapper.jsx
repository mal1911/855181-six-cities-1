import React from "react";
import {locationType, offerType} from "../../../prop-types";
import OfferComments from "../offer-comments";
import Map from "../../map";
import Card from "../../card";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getNearData, getNearLocationsData, getOffersError, getOffersData, getFavoritesData} from "../../../reducer/data/selectors";
import {ActionCreator, Operation} from "../../../reducer/data/data";
import {withRouter} from 'react-router';
import "./offer-wrapper.css";
import {MAX_NEAR_PALASES, MAX_OFFER_IMAGES} from "../../../constants";
import ErrorMessage from "../../error-message";
import withPopupToggle from "../../../hocs/with-popup-toggle/with-popup-toggle";

const OfferWrapper = ({
  offerObj,
  nearData,
  nearLocationsData,
  onChangeFavoriteStatus,
  onChangeActiveCard,
  error,
  offersData,
  favoritesData}) => {

  const imgs = offerObj.images.slice(0, MAX_OFFER_IMAGES).map((imageSrc, index) => <div key={index} className="property__image-wrapper">
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

  const handleChange = (cardObj) => {
    onChangeActiveCard(cardObj.id);
  };

  const handleButtonClick = (evt) => {
    onChangeFavoriteStatus(offerObj.id, offerObj.isFavorite ? 0 : 1, offersData, favoritesData);
    evt.preventDefault();
  };

  const handleCardNearButtonClick = (cardObj) => {
    onChangeFavoriteStatus(cardObj.id, cardObj.isFavorite ? 0 : 1, offersData, favoritesData);
  };

  const nearCards = nearData.slice(1, MAX_NEAR_PALASES + 1).map((obj, index) =>
    <Card
      key={index}
      offerObj={obj}
      cardClassName={`near`}
      onButtonClick={handleCardNearButtonClick}
      onChange={handleChange}
    />);

  const showErrorMessage = () => {
    const ToggleErrorMessage = withPopupToggle(ErrorMessage, true);
    return error ? <ToggleErrorMessage message={error.message}/> : null;
  };
  return <main className="page__main page__main--property">
    {showErrorMessage()}
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
              className={`property__bookmark-button button ${offerObj.isFavorite ? `property__bookmark-button--active` : ``}`}
              type="button"
              onClick={handleButtonClick}
            >
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
        <Map
          className={`property__map`}
          offersLocationsData={nearLocationsData.slice(0, MAX_NEAR_PALASES + 1)}
        />
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
  offersData: PropTypes.arrayOf(offerType),
  favoritesData: PropTypes.arrayOf(offerType),
  error: PropTypes.object,
  nearLocationsData: PropTypes.arrayOf(PropTypes.shape({
    location: locationType.isRequired,
    isActive: PropTypes.bool
  })),
  onChangeFavoriteStatus: PropTypes.func,
  onChangeActiveCard: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  nearData: getNearData(state),
  offersData: getOffersData(state),
  favoritesData: getFavoritesData(state),
  nearLocationsData: getNearLocationsData(state),
  error: getOffersError(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeFavoriteStatus: (id, status, offersData, favoritesData) => {
    dispatch(Operation.changeFavoriteStatus(id, status, offersData, favoritesData, () => ownProps.history.push(`/login`)));
  },
  onChangeActiveCard: (id) => {
    dispatch(ActionCreator.changeActiveOfferId(id));
  },
});

export {OfferWrapper};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfferWrapper));
