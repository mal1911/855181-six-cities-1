import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from "react-redux";
import reducer from './reducer';
import thunk from "redux-thunk";
import {compose} from 'recompose';
import {createAPI} from './api';
import {Operation} from "./reducer/offers-data/offers-data";
import {Operation as UserOperation} from "./reducer/user-data/user-data";
import App from './components/app/app';

const init = () => {
  const api = createAPI();

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );
  /* eslint-enable */

  store.dispatch(UserOperation.checkLogin());
  store.dispatch(Operation.loadOffersData());

  render(<Provider store={store}>
    <App/>
  </Provider>, document.getElementById(`root`));
};

init();
