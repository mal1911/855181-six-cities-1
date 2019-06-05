import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.OFFERS_DATA;

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

export const getLoadStatus = (state) => {
  return state[NAME_SPACE].isLoading;
};

export const getError = (state) => {
  return state[NAME_SPACE].error;
};

/*
export const getOffersDataStatus = createSelector(
  getOffersData,
  (offersData) => {
    if (!offersData.length) {
      return DATA_STATUS.EMPTY;
    } else if (offersData[0] === null) {
      return DATA_STATUS.LOADING;
    } else {
      return DATA_STATUS.DATA;
    }
  }
);
*/
export const getCitiesData = createSelector(
  getOffersData,
  (offersData) => {
    const citiesData = [];
    if (offersData.length) {
      offersData.forEach((offerObj) => {
        if (!citiesData.find((cityObj) => cityObj.name === offerObj.city.name)) {
          citiesData.push(offerObj.city);
        }
      });
      /*citiesData.push({
        name:`ququ`,
        location: {
          latitude: 10,
          longitude: 20,
          zoom: 10,
        }
      }
      );*/
    }
    return citiesData;
  }
);
/*
export const getFilteredOffersData = createSelector(
  getOffersData,
  getCitiesData,
  getActiveCityIndex,
  (offersData, citiesData, activeCityIndex) => {
    let filteredOffersData = [];
    if (citiesData.length && offersData.length) {
      filteredOffersData = offersData.filter((offerObj) => offerObj.city.name === citiesData[activeCityIndex].name);
    }
    return filteredOffersData;
  }
);

export const getResultOffersData = createSelector(
  getFilteredOffersData,
  getActiveOrderIndex,
  (filteredOffersData, activeOrderIndex) => {
    let resultOffersData = [...filteredOffersData];
    if (filteredOffersData.length && activeOrderIndex) {
      resultOffersData = filteredOffersData.sort(SORT_FUNCS[activeOrderIndex]);
    }
    return resultOffersData;
  }
);
*/

export const getResultOffersData = createSelector(
  getOffersData,
  getCitiesData,
  getActiveCityIndex,
  getActiveOrderIndex,
  (offersData, citiesData, activeCityIndex, activeOrderIndex) => {
    let resultOffersData = [];
    if (offersData.length && citiesData.length) {
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
    getOffersData,
    (resultOffersData, offersData) => offersData.length ? resultOffersData.length : 0
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
