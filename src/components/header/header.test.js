import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Header} from "./header";

it(`Header correctly renders`, () => {
  const tree = renderer
    .create(<BrowserRouter>
      <Header
        userInfo={{email: ``, avatarUrl: ``}}
      />
    </BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
