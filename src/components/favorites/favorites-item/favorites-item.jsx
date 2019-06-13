import React from "react";
import PropTypes from "prop-types";
import {offerType} from "../../../prop-types";
import FavoritesCard from "../favorites-card/index";

const FavoritesItem = (props) => {
  const favoritesCards = props.favoritesOneData.map((offerObj, index) =>
    <FavoritesCard key={index} offerObj={offerObj}/>);

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
};

export default FavoritesItem;
