import {
  getCitiesData,
  getResultOffersData,
  getCountResultOffers,
  getActiveCityName,
  getActiveOfferObj,
  getOffersLocationsData,
  getActiveMapLocation,
  getNearData,
  getNearLocationsData,
  getCityIndexFromOfferId,
  getResultFavoritesData,
  getCountResultFavorites,
} from "./selectors";

import {offersData, citiesData, offersLocationsData, nearData, favoritesData, resultFavoritesData} from "../../mocks/mocks";

describe(`get Data selector testing`, () => {
  it(`get getCitiesData testing`, () => {
    const selected = getCitiesData.resultFunc(offersData);
    expect(selected).toEqual(citiesData);
  });
  it(`get getResultOffersData testing`, () => {
    const selected = getResultOffersData.resultFunc(offersData, citiesData, 0, 0);
    expect(selected).toEqual(offersData.slice(0, 4));
  });
  it(`get getCountResultOffers testing`, () => {
    const selected = getCountResultOffers.resultFunc(offersData.slice(0, 4), offersData);
    expect(selected).toEqual(4);
  });
  it(`get getActiveCityName testing`, () => {
    const selected = getActiveCityName.resultFunc(citiesData, 0);
    expect(selected).toEqual(`Paris`);
  });
  it(`get getActiveOfferObj testing`, () => {
    const selected = getActiveOfferObj.resultFunc(offersData, 1);
    expect(selected).toEqual(offersData[0]);
  });
  it(`get getOffersLocationsData testing`, () => {
    const selected = getOffersLocationsData.resultFunc(offersData.slice(0, 4), offersData[0]);
    expect(selected).toEqual(offersLocationsData);
  });
  it(`get getActiveMapLocation testing`, () => {
    const selected = getActiveMapLocation.resultFunc(citiesData, 0, offersData[0]);
    expect(selected).toEqual(offersLocationsData[0].location);
  });
  it(`get getNearData testing`, () => {
    const selected = getNearData.resultFunc(offersData, offersData[0]).map((obj) => obj.distance);
    expect(selected).toEqual(nearData);
  });
  it(`get getNearLocationsData testing`, () => {
    const localNearData = getNearData.resultFunc(offersData, offersData[0]);
    const selected = getNearLocationsData.resultFunc(localNearData, offersData[0]);
    expect(selected).toEqual(localNearData.map((offerObj) => {
      return {
        location: offerObj.location,
        isActive: offerObj.id === 1,
      };
    }));
  });
  it(`get getCityIndexFromOfferId testing`, () => {
    const selected = getCityIndexFromOfferId.resultFunc(offersData, citiesData, 1);
    expect(selected).toEqual(0);
  });
  it(`get getResultFavoritesData testing`, () => {
    const selected = getResultFavoritesData.resultFunc(favoritesData);
    expect(selected).toEqual(resultFavoritesData);
  });
  it(`get getCountResultFavorites testing`, () => {
    const selected = getCountResultFavorites.resultFunc(resultFavoritesData);
    expect(selected).toEqual(6);
  });
});
