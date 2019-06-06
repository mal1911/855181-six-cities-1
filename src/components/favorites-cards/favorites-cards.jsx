import React from "react";
import PropTypes from "prop-types";
import {offerType} from "../../prop-types";
import FavoritesCard from "../favorites-card";

const FavoritesCards = (props) => {
  const favoritesCards = props.favoritesOneData.map((favoritesObj, index) =>
    <FavoritesCard key={index} favoritesObj={favoritesObj}/>);

  return <div className="favorites__places">{favoritesCards}</div>;
};

FavoritesCards.propTypes = {
  favoritesOneData: PropTypes.arrayOf(offerType.isRequired).isRequired,
};

export default FavoritesCards;


