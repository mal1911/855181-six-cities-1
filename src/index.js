import React from 'react';
import {render} from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer";
import App from './components/app/app';
import {offersMock} from './mocks/offers-mock';
import {citiesMock} from './mocks/cities-mock';

const init = () => {
  const store = createStore(reducer);
  render(<Provider store={store}>
    <App
      offersData={offersMock}
      citiesData={citiesMock}
    />
  </Provider>, document.getElementById(`root`));
};

init();
