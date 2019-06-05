const initialState = {
  activeCityIndex: 0,
  activeOrderIndex: 0,
  offersData: [],
  isLoading: true,
  error: null,
};

const ActionType = {
  LOADED_OFFERS_DATA: `LOAD_OFFERS_DATA`,
  CHANGE_LOAD_STATUS: `CHANGE_LOAD_STATUS`,
  CHANGE_ERROR_STATUS: `CHANGE_ERROR_STATUS`,
  CHANGE_ACTIVE_CITY_INDEX: `CHANGE_ACTIVE_CITY_INDEX`,
  CHANGE_ACTIVE_ORDER_INDEX: `CHANGE_ACTIVE_ORDER_INDEX`,
};

const ActionCreator = {
  loadedOffersData: (offersData) => {
    return {
      type: ActionType.LOADED_OFFERS_DATA,
      payload: offersData,
    };
  },
  changeLoadStatus: (status) => ({
    type: ActionType.CHANGE_LOAD_STATUS,
    payload: status,
  }),
  changeErrorStatus: (error) => ({
    type: ActionType.CHANGE_ERROR_STATUS,
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
};

const Operation = {
  loadOffersData: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadedOffersData(response.data));
        dispatch(ActionCreator.changeLoadStatus(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.changeErrorStatus(err));
        dispatch(ActionCreator.changeLoadStatus(false));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOADED_OFFERS_DATA:
      return Object.assign({}, state, {
        offersData: action.payload,
      });
    case ActionType.CHANGE_LOAD_STATUS:
      return Object.assign({}, state, {
        isLoading: action.payload
      });
    case ActionType.CHANGE_ERROR_STATUS:
      return Object.assign({}, state, {
        error: action.payload
      });
    case ActionType.CHANGE_ACTIVE_CITY_INDEX:
      return Object.assign({}, state, {
        activeCityIndex: action.payload
      });
    case ActionType.CHANGE_ACTIVE_ORDER_INDEX:
      return Object.assign({}, state, {
        activeOrderIndex: action.payload
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
