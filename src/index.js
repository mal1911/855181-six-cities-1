import React from 'react';
import {render} from 'react-dom';
import App from './components/app/app';

const init = () => {
  const titles = [
    `Beautiful & luxurious apartment at great location`,
    `Wood and stone place`,
    `Canal View Prinsengracht`,
    `Nice, cozy, warm big bed apartment`,
  ];

  render(<App titles={titles}/>, document.getElementById(`root`));
};

init();
