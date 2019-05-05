import React from 'react';
import {render} from 'react-dom';
import App from './components/app/app';

const init = () => {
  render(
      <App/>,
      document.getElementById(`root`)
  );
};

init();
