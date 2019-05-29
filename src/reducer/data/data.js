const initialState = {
  activeCityIndex: 0,
  activeOrderIndex: 0,
  offersData: [],
  resultOffersData: [],
};

const ActionType = {
  LOAD_OFFERS_DATA: `LOAD_OFFERS_DATA`,
  CHANGE_ACTIVE_CITY: `CHANGE_ACTIVE_CITY`,
};

const ActionCreator = {
  loadOffersData: (offersData) => {
    return {
      type: ActionType.LOAD_OFFERS_DATA,
      payload: offersData,
    };
  },
  changeActiveCityIndex: (index) => ({
    type: ActionType.CHANGE_ACTIVE_CITY,
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
    case ActionType.CHANGE_ACTIVE_CITY:
      return Object.assign({}, state, {
        activeCityIndex: action.payload
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
