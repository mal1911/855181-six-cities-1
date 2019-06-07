import {transformCommentsForLoading} from "../../transform-data";

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
  loadData: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        const data = response.data.map((obj) => transformCommentsForLoading(obj));
        console.log(data);
        dispatch(ActionCreator.loadedData(data));
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
    case ActionType.LOADED_DATA:
      return Object.assign({}, state, {
        data: action.payload,
      });
    case ActionType.CHANGE_LOAD_STATUS:
      return Object.assign({}, state, {
        isLoading: action.payload
      });
    case ActionType.CHANGE_ERROR_STATUS:
      return Object.assign({}, state, {
        error: action.payload
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
