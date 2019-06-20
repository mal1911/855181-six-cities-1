import {transformOfferForLoading} from "../../transform-data";
import {HTML_STATUS} from "../../constants";

const initialState = {
  favoritesData: [],
  isFavoritesLoading: true,
  favoritesError: null,
};

const ActionType = {
  LOADED_FAVORITES_DATA: `LOADED_FAVORITES_DATA`,
  CHANGE_FAVORITES_LOAD_STATUS: `CHANGE_FAVORITES_LOAD_STATUS`,
  CHANGE_FAVORITES_ERROR_STATUS: `CHANGE_FAVORITES_ERROR_STATUS`,
};

const ActionCreator = {
  loadedFavoritesData: (data) => {
    return {
      type: ActionType.LOADED_FAVORITES_DATA,
      payload: data,
    };
  },
  changeFavoritesLoadStatus: (status) => ({
    type: ActionType.CHANGE_FAVORITES_LOAD_STATUS,
    payload: status,
  }),
  changeFavoritesErrorStatus: (error) => ({
    type: ActionType.CHANGE_FAVORITES_ERROR_STATUS,
    payload: error,
  }),
};

const Operation = {
  loadFavoritesData: (history) => (dispatch, _getState, api) => {
    dispatch(ActionCreator.changeFavoritesLoadStatus(true));
    dispatch(ActionCreator.changeFavoritesErrorStatus(null));

    return api.get(`/favorite`)
      .then((response) => {
        const data = response.data.map((obj) => transformOfferForLoading(obj));
        dispatch(ActionCreator.loadedFavoritesData(data));
      })
      .catch((err) => {
        if (err.response.status === HTML_STATUS.FORBIDDEN) {
          history.push(`/login`);
        } else {
          dispatch(ActionCreator.changeFavoritesErrorStatus(err));
        }
      })
      .finally(() => {
        dispatch(ActionCreator.changeFavoritesLoadStatus(false));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOADED_FAVORITES_DATA:
      return Object.assign({}, state, {
        favoritesData: action.payload,
      });
    case ActionType.CHANGE_FAVORITES_LOAD_STATUS:
      return Object.assign({}, state, {
        isFavoritesLoading: action.payload
      });
    case ActionType.CHANGE_FAVORITES_ERROR_STATUS:
      return Object.assign({}, state, {
        favoritesError: action.payload
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
