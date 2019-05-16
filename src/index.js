import React from 'react';
import {render} from 'react-dom';
import App from './components/app/app';
import {offers} from "./mocks/offers";

const init = () => {
  render(<App offers={offers}/>, document.getElementById(`root`));
};

init();
