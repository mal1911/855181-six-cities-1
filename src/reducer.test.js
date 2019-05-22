import {offersData, citiesData} from './mocks/mocks';
import {ActionCreator, getFilteredOffersData, reducer} from "./reducer";

describe(`Business logic is correct`, () => {
  it(`getFilteredOffersData is correct return`, () => {
    expect(getFilteredOffersData(citiesData[0].name)[0]).toEqual(offersData[0]);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changeActiveCity returns correct action`, () => {
    expect(ActionCreator.changeActiveCity(citiesData[0].name)).toEqual({
      type: `CHANGE_ACTIVE_CITY`,
      payload: citiesData[0].name,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeCity: citiesData[0].name,
      filteredOffersData: getFilteredOffersData(citiesData[0].name),
      citiesData
    });
  });

  it(`Reducer should return activeCity`, () => {
    expect(reducer(undefined, {
      type: `CHANGE_ACTIVE_CITY`,
      payload: citiesData[1].name,
    })).toEqual({
      activeCity: citiesData[1].name,
      filteredOffersData: getFilteredOffersData(citiesData[1].name),
      citiesData
    });
  });
});
