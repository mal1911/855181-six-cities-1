import React from "react";
import renderer from "react-test-renderer";
import FavoritesWrapperEmpty from "./favorites-wrapper-empty";

it(`FavoritesWrapperEmpty correctly renders`, () => {
  const tree = renderer
    .create(<FavoritesWrapperEmpty/>).toJSON();
  expect(tree).toMatchSnapshot();
});
