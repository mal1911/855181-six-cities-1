import React from 'react';
import ReactDOM from 'react-dom';
import Stateless from './components/stateless/stateless.jsx';

const init = () => {
  ReactDOM.render(
      <Stateless/>,
      document.getElementById(`root`)
  );
};

init();
