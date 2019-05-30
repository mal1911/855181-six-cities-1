import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.DATA;

const SORT_FUNCS = [
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
      return citiesData;
    }
);

export const getResultOffersData = createSelector(
    getOffersData,
    getCitiesData,
    getActiveCityIndex,
    getActiveOrderIndex,
    (offersData, citiesData, activeCityIndex, activeOrderIndex) => {
      let resultOffersData = [];
      if (citiesData.length) {
        resultOffersData = offersData.filter((offerObj) => offerObj.city.name === citiesData[activeCityIndex].name);
        if (activeOrderIndex) {
          resultOffersData = resultOffersData.sort(SORT_FUNCS[activeOrderIndex]);
        }
      }
      return resultOffersData;
    }
);

export const getCountResultOffers = createSelector(
    getResultOffersData,
    (resultOffersData) => resultOffersData.length
);

export const getActiveCityName = createSelector(
    getCitiesData,
    getActiveCityIndex,
    (citiesData, activeCityIndex) =>
      citiesData.length ? citiesData[activeCityIndex].name : ``
);

export const getOffersCoordinatesData = createSelector(
    getResultOffersData,
    (resultOffersData) =>
      resultOffersData.map((offerObj) => [offerObj.location.latitude, offerObj.location.longitude])
);

export const getActiveMapObj = createSelector(
    getCitiesData,
    getActiveCityIndex,
    (citiesData, activeCityIndex) => {
      let resultObj = null;
      if (citiesData.length) {
        const cityObj = citiesData[activeCityIndex];
        resultObj = {
          coordinates: [cityObj.location.latitude, cityObj.location.longitude],
          zoom: cityObj.location.zoom,
        };
      }
      return resultObj;
    }
);

