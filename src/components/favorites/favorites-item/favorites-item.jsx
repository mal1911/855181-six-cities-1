import React from "react";
import PropTypes from "prop-types";
import {offerType} from "../../../prop-types";
import Card from "../../card";
import {Operation} from "../../../reducer/offers-data/offers-data";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {ActionCreator} from "../../../reducer/favorites-data/favorites-data";

const FavoritesItem = (props) => {

  const onButtonClick = (offerObj) => {
    if (onButtonClick) {
      props.onChangeFavoriteStatus(offerObj.id, offerObj.isFavorite ? 0 : 1);
    }
  };

  const handleChange = (cardObj) => {
    props.onChangeActiveCard(cardObj.id);
  };


  const favoritesCards = props.favoritesOneData.map((offerObj, index) =>
    <Card
      key={index}
      offerObj={offerObj}
      cardClassName={`favorites`}
      onButtonClick={onButtonClick}
      onChange={handleChange}
    />);


  return <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link">
          <span>{props.favoritesOneData[0].city.name}</span>
        </a>
      </div>
    </div>
    <div className="favorites__places">{favoritesCards}</div>
  </li>;
};

FavoritesItem.propTypes = {
  favoritesOneData: PropTypes.arrayOf(offerType),
  onChangeFavoriteStatus: PropTypes.func,
  onChangeActiveCard: PropTypes.func,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeFavoriteStatus: (id, status) => {
    dispatch(Operation.changeFavoriteStatus(id, status, ownProps.history));
  },
  onChangeActiveCard: (id) => {
    dispatch(ActionCreator.changeActiveOfferId(id));
  },
});

export {FavoritesItem};

export default withRouter(connect(null, mapDispatchToProps)(FavoritesItem));
