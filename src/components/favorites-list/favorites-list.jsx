import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getResultFavoritesData} from "../../reducer/favorites-data/selectors";
import FavoritesItem from "../favorites-item";

const FavoritesList = (props) => {
  const favoritesItems = props.resultFavoritesData.map((favoritesObj, index) =>
    <FavoritesItem key={index} favoritesOneData={favoritesObj}/>);

  return <ul className="favorites__list">{favoritesItems}</ul>;
};

FavoritesList.propTypes = {
  resultFavoritesData: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  resultFavoritesData: getResultFavoritesData(state),
});

export {FavoritesList};

export default connect(mapStateToProps)(FavoritesList);


