import {transformOfferForLoading} from "../../transform-data";

const initialState = {
  activeCityIndex: 0,
  activeOrderIndex: 0,
  activeOfferId: 0,
  offersData: [],
  isOffersLoading: true,
  offersError: null,
};

const ActionType = {
  LOADED_OFFERS_DATA: `LOADED_OFFERS_DATA`,
  CHANGE_OFFERS_LOAD_STATUS: `CHANGE_OFFERS_LOAD_STATUS`,
  CHANGE_OFFERS_ERROR_STATUS: `CHANGE_OFFERS_ERROR_STATUS`,
  CHANGE_ACTIVE_CITY_INDEX: `CHANGE_ACTIVE_CITY_INDEX`,
  CHANGE_ACTIVE_ORDER_INDEX: `CHANGE_ACTIVE_ORDER_INDEX`,
  CHANGE_ACTIVE_OFFER_ID: `CHANGE_ACTIVE_OFFER_ID`,
};

const ActionCreator = {
  loadedOffersData: (data) => {
    return {
      type: ActionType.LOADED_OFFERS_DATA,
      payload: data,
    };
  },
  changeOffersLoadStatus: (status) => ({
    type: ActionType.CHANGE_OFFERS_LOAD_STATUS,
    payload: status,
  }),
  changeOffersErrorStatus: (error) => ({
    type: ActionType.CHANGE_OFFERS_ERROR_STATUS,
    payload: error,
  }),
  changeActiveCityIndex: (index) => ({
    type: ActionType.CHANGE_ACTIVE_CITY_INDEX,
    payload: index,
  }),
  changeActiveOrderIndex: (index) => ({
    type: ActionType.CHANGE_ACTIVE_ORDER_INDEX,
    payload: index,
  }),
  changeActiveOfferId: (index) => ({
    type: ActionType.CHANGE_ACTIVE_OFFER_ID,
    payload: index,
  }),
};

const Operation = {
  loadOffersData: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const data = response.data.map((obj) => transformOfferForLoading(obj));
        dispatch(ActionCreator.loadedOffersData(data));
        dispatch(ActionCreator.changeOffersLoadStatus(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.changeOffersErrorStatus(err));
        dispatch(ActionCreator.changeOffersLoadStatus(false));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOADED_OFFERS_DATA:
      return Object.assign({}, state, {
        offersData: action.payload,
      });
    case ActionType.CHANGE_OFFERS_LOAD_STATUS:
      return Object.assign({}, state, {
        isOffersLoading: action.payload
      });
    case ActionType.CHANGE_OFFERS_ERROR_STATUS:
      return Object.assign({}, state, {
        offersError: action.payload
      });
    case ActionType.CHANGE_ACTIVE_CITY_INDEX:
      return Object.assign({}, state, {
        activeCityIndex: action.payload,
        activeOfferId: 0
      });
    case ActionType.CHANGE_ACTIVE_ORDER_INDEX:
      return Object.assign({}, state, {
        activeOrderIndex: action.payload
      });
    case ActionType.CHANGE_ACTIVE_OFFER_ID:
      return Object.assign({}, state, {
        activeOfferId: action.payload
      });
  }
  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
