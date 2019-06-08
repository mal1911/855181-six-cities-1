import {createSelector} from "reselect";
import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.COMMENTS_DATA;

export const getCommentsData = (state) => {
  return state[NAME_SPACE].commentsData;
};

export const getCommentsLoadStatus = (state) => {
  return state[NAME_SPACE].isCommentsLoading;
};

export const getCommentsError = (state) => {
  return state[NAME_SPACE].commentsError;
};

/*
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
    //console.log(resultFavoritesData);
    return resultFavoritesData;
  }
);

export const getCountResultFavorites = createSelector(
  getResultFavoritesData,
  (resultFavoritesData) => resultFavoritesData.length
);
*/
