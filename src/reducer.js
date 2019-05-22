import {offersData, citiesData} from './mocks/mocks';
const getFilteredOffersData = (city) => offersData.filter((offer) => offer.city === city);

const initialState = {
  activeCity: citiesData[0].name,
  filteredOffersData: getFilteredOffersData(citiesData[0].name),
  citiesData,
};

const ActionCreator = {
  changeActiveCity: (activeCity) => ({
    type: `CHANGE_ACTIVE_CITY`,
    payload: activeCity,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_ACTIVE_CITY`: return Object.assign({}, state, {
      activeCity: action.payload,
      filteredOffersData: getFilteredOffersData(action.payload),
    });
  }
  return state;
};

export {
  ActionCreator,
  getFilteredOffersData,
  reducer,
};
