import {transformOfferForLoading} from "../../transform-data";

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
  loadFavoritesData: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const data = response.data.map((obj) => transformOfferForLoading(obj));
        dispatch(ActionCreator.loadedFavoritesData(data));
        dispatch(ActionCreator.changeFavoritesLoadStatus(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.changeFavoritesErrorStatus(err));
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
