import {transformOfferForLoading} from "../../transform-data";
import {HTML_STATUS} from "../../constants";
import {ActionCreator as FavoritesActionCreator} from "../favorites-data/favorites-data";

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
  CHANGE_OFFERS_DATA: `CHANGE_OFFERS_DATA`,
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
  changeOffersData: (data) => {
    return {
      type: ActionType.CHANGE_OFFERS_DATA,
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
    payload: index
  })
};

const beforeLoading = (dispatch) => {
  dispatch(ActionCreator.changeOffersLoadStatus(true));
  dispatch(ActionCreator.changeOffersErrorStatus(null));
  dispatch(FavoritesActionCreator.changeFavoritesErrorStatus(null));
};

const afterLoading = (dispatch) => {
  dispatch(ActionCreator.changeOffersLoadStatus(false));
};

const Operation = {
  loadOffersData: () => (dispatch, _getState, api) => {
    beforeLoading(dispatch);
    return api.get(`/hotels`)
      .then((response) => {
        const data = response.data.map((obj) => transformOfferForLoading(obj));
        dispatch(ActionCreator.loadedOffersData(data));
        afterLoading(dispatch);
      })
      .catch((err) => {
        dispatch(ActionCreator.changeOffersErrorStatus(err));
        afterLoading(dispatch);
      });
  },

  changeFavoriteStatus: (id, status, history) => (dispatch, _getState, api) => {
    beforeLoading(dispatch);
    return api.post(`/favorite/${id}/${status}`)
      .then((response) => {
        const newObj = transformOfferForLoading(response.data);
        const offersData = _getState().OFFERS_DATA.offersData.map(
            (obj) => newObj.id === obj.id ? Object.assign({}, newObj) : obj);
        dispatch(ActionCreator.changeOffersData(offersData));

        const favoritesData = _getState().FAVORITES_DATA.favoritesData;
        const index = favoritesData.findIndex((obj) => obj.id === id);
        const newData = [...favoritesData.slice(0, index), ...favoritesData.slice(index + 1)];
        dispatch(FavoritesActionCreator.loadedFavoritesData(newData));
        afterLoading(dispatch);
      })
      .catch((err) => {
        if (err.status === HTML_STATUS.FORBIDDEN) {
          history.push(`/login`);
        } else {
          dispatch(FavoritesActionCreator.changeFavoritesErrorStatus(err));
        }
        afterLoading(dispatch);
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
      });
    case ActionType.CHANGE_ACTIVE_ORDER_INDEX:
      return Object.assign({}, state, {
        activeOrderIndex: action.payload
      });
    case ActionType.CHANGE_ACTIVE_OFFER_ID: {
      return Object.assign({}, state, {
        activeOfferId: action.payload,
      });
    }
    case ActionType.CHANGE_OFFERS_DATA: {
      return Object.assign({}, state, {
        offersData: action.payload,
      });
    }
  }
  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
