import React from 'react';
import {render} from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer";
import App from './components/app/app';

const init = () => {
  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  render(<Provider store={store}>
    <App/>
  </Provider>, document.getElementById(`root`));
};

init();
