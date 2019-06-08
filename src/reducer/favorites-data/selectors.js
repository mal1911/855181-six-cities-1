import {createSelector} from "reselect";
import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.FAVORITES_DATA;

export const getFavoritesData = (state) => {
  return state[NAME_SPACE].favoritesData;
};

export const getFavoritesLoadStatus = (state) => {
  return state[NAME_SPACE].isFavoritesLoading;
};

export const getFavoritesError = (state) => {
  return state[NAME_SPACE].favoritesError;
};

export const getResultFavoritesData = createSelector(
    getFavoritesData,
    (favoritesData) => {
      const resultFavoritesData = [];
      favoritesData.forEach((obj) => {
        let index = -1;
        if (resultFavoritesData.length) {
          index = resultFavoritesData.findIndex((resObj) => resObj[0].city.name === obj.city.name);
        }
        if (index === -1) {
          index = resultFavoritesData.push([]) - 1;
        }
        resultFavoritesData[index].push(obj);
      });
      return resultFavoritesData;
    }
);

export const getCountResultFavorites = createSelector(
    getResultFavoritesData,
    (resultFavoritesData) => resultFavoritesData.length
);
