import {createSelector} from "reselect";
import NameSpace from "../name-spaces";

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

export const getActiveOfferId = (state) => {
  return state[NAME_SPACE].activeOfferId;
};

export const getOffersLoadStatus = (state) => {
  return state[NAME_SPACE].isOffersLoading;
};

export const getOffersError = (state) => {
  return state[NAME_SPACE].offersError;
};

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
    //console.log(resultOffersData);
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

export const getActiveOfferObj = createSelector(
    getOffersData,
    getActiveOfferId,
    (offersData, activeOfferId) => {
      const resObj = offersData.find((offerObj) => offerObj.id === activeOfferId);
      //console.log(activeOfferId, resObj);
      return resObj ? resObj : null;
    }
);
