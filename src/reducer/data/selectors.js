import {createSelector} from "reselect";
import NameSpace from "../name-spaces";
import {MAX_CITIES} from "../../constants";

const NAME_SPACE = NameSpace.DATA;

const SORT_FUNCS = [
  null,
  (a, b) => a.price < b.price,
  (a, b) => a.price > b.price,
  (a, b) => a.rating < b.rating,
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

export const getLoadStatus = (state) => {
  return state[NAME_SPACE].isLoading;
};

export const getOffersError = (state) => {
  return state[NAME_SPACE].offersError;
};

export const getFavoritesData = (state) => {
  return state[NAME_SPACE].favoritesData;
};

export const getFavoritesError = (state) => {
  return state[NAME_SPACE].favoritesError;
};

export const getCommentsData = (state) => {
  return state[NAME_SPACE].commentsData.sort((a, b) => a.date < b.date);
};

export const getCommentsError = (state) => {
  return state[NAME_SPACE].commentsError;
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
      }
      return citiesData.slice(0, MAX_CITIES);
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

export const getActiveOfferObj = createSelector(
    getOffersData,
    getActiveOfferId,
    (offersData, activeOfferId) => {
      const resObj = offersData.find((offerObj) => offerObj.id === activeOfferId);
      return resObj ? resObj : null;
    }
);

export const getOffersLocationsData = createSelector(
    getResultOffersData,
    getActiveOfferObj,
    (resultOffersData, activeOfferObj) =>
      resultOffersData.map((offerObj) => {
        return {
          location: offerObj.location,
          isActive: offerObj === activeOfferObj,
        };
      })
);

export const getActiveMapLocation = createSelector(
    getCitiesData,
    getActiveCityIndex,
    getActiveOfferObj,
    (citiesData, activeCityIndex, activeOfferObj) => {
      if (!activeOfferObj && citiesData.length) {
        return citiesData[activeCityIndex].location;
      } else if (activeOfferObj) {
        return activeOfferObj.location;
      } else {
        return null;
      }
    }
);

export const getNearData = createSelector(
    getOffersData,
    getActiveOfferObj,
    (offersData, activeOfferObj) => {
      const getDistance = (currLocation) => {
        return Math.sqrt(
            Math.pow(Math.abs(activeOfferObj.location.latitude - currLocation.latitude), 2) +
            Math.pow(Math.abs(activeOfferObj.location.longitude - currLocation.longitude), 2));
      };
      return offersData.map(
          (offerObj) => Object.assign({}, offerObj, {distance: getDistance(offerObj.location)})
      ).sort(
          (a, b) => a.distance > b.distance
      );
    }
);

export const getNearLocationsData = createSelector(
    getNearData,
    getActiveOfferObj,
    (nearData, activeOfferObj) =>
      nearData.map((offerObj) => {
        return {
          location: offerObj.location,
          isActive: offerObj.id === activeOfferObj.id,
        };
      })
);

export const getCityIndexFromOfferId = createSelector(
    getOffersData,
    getCitiesData,
    getActiveOfferId,
    (offersData, citiesData, activeOfferId) => {
      if (offersData.length > 0 && activeOfferId > 0) {
        const cityName = offersData.find((offerObj) => activeOfferId === offerObj.id).city.name;
        return citiesData.findIndex((cityObj) => cityObj.name === cityName);
      } else {
        return 0;
      }
    }
);

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
