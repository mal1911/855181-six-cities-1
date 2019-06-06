import React from "react";
import PropTypes from "prop-types";
import {offerType} from "../../prop-types";
import FavoritesCards from "../favorites-cards";

const FavoritesItem = (props) => {
  return <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link">
          <span>{props.favoritesOneData[0].city.name}</span>
        </a>
      </div>
    </div>
    <FavoritesCards favoritesOneData={props.favoritesOneData}/>
  </li>;
};

FavoritesItem.propTypes = {
  favoritesOneData: PropTypes.arrayOf(offerType.isRequired).isRequired,
};

export default FavoritesItem;
