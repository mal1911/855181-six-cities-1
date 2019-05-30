const initialState = {
  activeCityIndex: 0,
  activeOrderIndex: 0,
  offersData: [],
};

const ActionType = {
  LOAD_OFFERS_DATA: `LOAD_OFFERS_DATA`,
  CHANGE_ACTIVE_CITY_INDEX: `CHANGE_ACTIVE_CITY_INDEX`,
  CHANGE_ACTIVE_ORDER_INDEX: `CHANGE_ACTIVE_ORDER_INDEX`,
};

const ActionCreator = {
  loadOffersData: (offersData) => {
    return {
      type: ActionType.LOAD_OFFERS_DATA,
      payload: offersData,
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
};

const Operation = {
  loadOffersData: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffersData(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS_DATA:
      return Object.assign({}, state, {
        offersData: action.payload,
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
