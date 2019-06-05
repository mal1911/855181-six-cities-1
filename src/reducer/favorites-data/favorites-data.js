const initialState = {
  data: [],
  isLoading: true,
  error: null,
};

const ActionType = {
  LOADED_DATA: `LOADED_DATA`,
  CHANGE_LOAD_STATUS: `CHANGE_LOAD_STATUS`,
  CHANGE_ERROR_STATUS: `CHANGE_ERROR_STATUS`,
};

const ActionCreator = {
  loadedData: (data) => {
    return {
      type: ActionType.LOADED_DATA,
      payload: data,
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
};

const Operation = {
  loadData: () => (dispatch, _getState, api) => {
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
