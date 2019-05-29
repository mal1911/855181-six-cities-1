import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.DATA;

const SortFuncCreator = [
  null,
  (a, b) => a.price > b.price,
  (a, b) => a.price < b.price,
  (a, b) => a.rating > b.rating,
];

export const getOffersData = (state) => {
  return state[NAME_SPACE].offersData;
};

export const getActiveCityIndex = (state) => {
  return state[NAME_SPACE].activeCityIndex;
};

export const getActiveOrderIndex = (state) => {
  return state[NAME_SPACE].activeOrderIndex;
};

export const getCitiesData = createSelector(
  getOffersData,
  (offersData) => {
    const citiesData = [];
    offersData.forEach((offerObj) => {
      if (!citiesData.find((cityObj) => cityObj.name === offerObj.city.name)) {
        citiesData.push(offerObj.city);
      }
    });
    console.log(citiesData);
    return citiesData;
  }
);

export const getResultOffersData = createSelector(
    getOffersData,
    getCitiesData,
    getActiveCityIndex,
    (offersData, citiesData, activeCityIndex) => {
      if (citiesData.length > 0) {
        return offersData.filter((offerObj) => offerObj.city.name === citiesData[activeCityIndex].name);
      }
      return [];
    }
);

export const getCountResultOffers = createSelector(
    getResultOffersData,
  (resultOffersData) => resultOffersData.length
);

export const getActiveCityName = createSelector(
  getCitiesData,
  getActiveCityIndex,
  (citiesData, activeCityIndex) => citiesData[activeCityIndex]
);
