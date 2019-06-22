import {transformOfferForLoading, transformCommentsForLoading} from "../../transform-data";
import {HTML_STATUS} from "../../constants";

const initialState = {
  activeCityIndex: 0,
  activeOrderIndex: 0,
  activeOfferId: 0,
  offersData: [],
  favoritesData: [],
  commentsData: [],
  offersError: null,
  favoritesError: null,
  commentsError: null,
  isLoading: true,
};

const ActionType = {
  CHANGE_LOAD_STATUS: `CHANGE_LOAD_STATUS`,
  CHANGE_OFFERS_DATA: `CHANGE_OFFERS_DATA`,
  CHANGE_FAVORITES_DATA: `CHANGE_FAVORITES_DATA`,
  CHANGE_COMMENTS_DATA: `CHANGE_COMMENTS_DATA`,
  CHANGE_ACTIVE_CITY_INDEX: `CHANGE_ACTIVE_CITY_INDEX`,
  CHANGE_ACTIVE_ORDER_INDEX: `CHANGE_ACTIVE_ORDER_INDEX`,
  CHANGE_ACTIVE_OFFER_ID: `CHANGE_ACTIVE_OFFER_ID`,
  CHANGE_OFFERS_ERROR_STATUS: `CHANGE_OFFERS_ERROR_STATUS`,
  CHANGE_FAVORITES_ERROR_STATUS: `CHANGE_FAVORITES_ERROR_STATUS`,
  CHANGE_COMMENTS_ERROR_STATUS: `CHANGE_COMMENTS_ERROR_STATUS`,
};

const ActionCreator = {
  changeLoadStatus: (status) => ({
    type: ActionType.CHANGE_LOAD_STATUS,
    payload: status,
  }),
  changeOffersData: (data) => {
    return {
      type: ActionType.CHANGE_OFFERS_DATA,
      payload: data,
    };
  },
  changeFavoritesData: (data) => {
    return {
      type: ActionType.CHANGE_FAVORITES_DATA,
      payload: data,
    };
  },
  changeCommentsData: (data) => {
    return {
      type: ActionType.CHANGE_COMMENTS_DATA,
      payload: data,
    };
  },
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
  }),
  changeOffersErrorStatus: (error) => ({
    type: ActionType.CHANGE_OFFERS_ERROR_STATUS,
    payload: error,
  }),
  changeFavoritesErrorStatus: (error) => ({
    type: ActionType.CHANGE_FAVORITES_ERROR_STATUS,
    payload: error,
  }),
  changeCommentsErrorStatus: (error) => ({
    type: ActionType.CHANGE_COMMENTS_ERROR_STATUS,
    payload: error,
  }),
};


const beforeCommentsLoading = (dispatch) => {
  dispatch(ActionCreator.changeLoadStatus(true));
  dispatch(ActionCreator.changeCommentsErrorStatus(null));
};

const successCommentsLoading = (dispatch, data) => {
  dispatch(ActionCreator.changeCommentsData(
      data.map((obj) => transformCommentsForLoading(obj)))
  );
  dispatch(ActionCreator.changeLoadStatus(false));
};

const errorCommentsLoading = (dispatch, err) => {
  dispatch(ActionCreator.changeCommentsErrorStatus(err));
  dispatch(ActionCreator.changeLoadStatus(false));
};

const beforeOffersLoading = (dispatch) => {
  dispatch(ActionCreator.changeLoadStatus(true));
  dispatch(ActionCreator.changeOffersErrorStatus(null));
  dispatch(ActionCreator.changeFavoritesErrorStatus(null));
};


const Operation = {
  loadOffersData: () => (dispatch, _getState, api) => {
    beforeOffersLoading(dispatch);
    return api.get(`/hotels`)
      .then((response) => {
        const data = response.data.map((obj) => transformOfferForLoading(obj));
        dispatch(ActionCreator.changeOffersData(data));
        dispatch(ActionCreator.changeLoadStatus(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.changeOffersErrorStatus(err));
        dispatch(ActionCreator.changeLoadStatus(false));
      });
  },

  loadFavoritesData: (onGoLogin) => (dispatch, _getState, api) => {
    dispatch(ActionCreator.changeLoadStatus(true));
    dispatch(ActionCreator.changeFavoritesErrorStatus(null));

    return api.get(`/favorite`)
      .then((response) => {
        const data = response.data.map((obj) => transformOfferForLoading(obj));
        dispatch(ActionCreator.changeFavoritesData(data));
        dispatch(ActionCreator.changeLoadStatus(false));
      })
      .catch((err) => {
        if (err.status === HTML_STATUS.FORBIDDEN) {
          onGoLogin();
        } else {
          dispatch(ActionCreator.changeFavoritesErrorStatus(err));
          dispatch(ActionCreator.changeLoadStatus(false));
        }
      });
  },

  changeFavoriteStatus: (id, status, offersData, favoritesData, onGoLogin) => (dispatch, _getState, api) => {
    beforeOffersLoading(dispatch);
    return api.post(`/favorite/${id}/${status}`)
      .then((response) => {
        const newObj = transformOfferForLoading(response.data);
        let newData = offersData.map(
            (obj) => newObj.id === obj.id ? Object.assign({}, newObj) : obj);
        dispatch(ActionCreator.changeOffersData(newData));
        const index = favoritesData.findIndex((obj) => obj.id === id);
        newData = [...favoritesData.slice(0, index), ...favoritesData.slice(index + 1)];
        dispatch(ActionCreator.changeFavoritesData(newData));
        dispatch(ActionCreator.changeLoadStatus(false));
      })
      .catch((err) => {
        if (err.status === HTML_STATUS.FORBIDDEN) {
          onGoLogin();
        } else {
          dispatch(ActionCreator.changeFavoritesErrorStatus(err));
        }
        dispatch(ActionCreator.changeLoadStatus(false));
      });
  },

  loadCommentsData: (id) => (dispatch, _getState, api) => {
    beforeCommentsLoading(dispatch);
    return api.get(`/comments/${id}`)
      .then((response) => {
        successCommentsLoading(dispatch, response.data);
      })
      .catch((err) => {
        errorCommentsLoading(dispatch, err);
      });
  },

  saveCommentObj: (id, commentObj) => (dispatch, _getState, api) => {
    beforeCommentsLoading(dispatch);
    return api.post(`/comments/${id}`, commentObj)
      .then((response) => {
        successCommentsLoading(dispatch, response.data);
      })
      .catch((err) => {
        errorCommentsLoading(dispatch, err);
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_LOAD_STATUS:
      return Object.assign({}, state, {
        isLoading: action.payload
      });
    case ActionType.CHANGE_OFFERS_DATA: {
      return Object.assign({}, state, {
        offersData: action.payload,
      });
    }
    case ActionType.CHANGE_FAVORITES_DATA:
      return Object.assign({}, state, {
        favoritesData: action.payload,
      });
    case ActionType.CHANGE_COMMENTS_DATA:
      return Object.assign({}, state, {
        commentsData: action.payload,
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
    case ActionType.CHANGE_OFFERS_ERROR_STATUS:
      return Object.assign({}, state, {
        offersError: action.payload
      });
    case ActionType.CHANGE_FAVORITES_ERROR_STATUS:
      return Object.assign({}, state, {
        favoritesError: action.payload
      });
    case ActionType.CHANGE_COMMENTS_ERROR_STATUS:
      return Object.assign({}, state, {
        commentsError: action.payload
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
