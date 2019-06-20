import React from "react";
import PropTypes from "prop-types";
import {offerType} from "../../../prop-types";
import Card from "../../card";
import {Operation} from "../../../reducer/data/data";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {ActionCreator} from "../../../reducer/data/data";
import {getFavoritesData, getOffersData} from "../../../reducer/data/selectors";

const FavoritesItem = (props) => {

  const onButtonClick = (offerObj) => {
    if (onButtonClick) {
      props.onChangeFavoriteStatus(offerObj.id, offerObj.isFavorite ? 0 : 1, props.offersData, props.favoritesData);
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
  offersData: PropTypes.arrayOf(offerType),
  favoritesData: PropTypes.arrayOf(offerType),
  onChangeFavoriteStatus: PropTypes.func,
  onChangeActiveCard: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offersData: getOffersData(state),
  favoritesData: getFavoritesData(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeFavoriteStatus: (id, status, offersData, favoritesData) => {
    dispatch(Operation.changeFavoriteStatus(id, status, offersData,
        favoritesData, () => ownProps.history.push(`/login`)));
  },
  onChangeActiveCard: (id) => {
    dispatch(ActionCreator.changeActiveOfferId(id));
  },
});

export {FavoritesItem};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FavoritesItem));
