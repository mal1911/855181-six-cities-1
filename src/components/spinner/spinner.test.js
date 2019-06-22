import React from "react";
import renderer from "react-test-renderer";
import Spinner from "./spinner";

it(`Spinner correctly renders`, () => {
  const tree = renderer
    .create(<Spinner/>).toJSON();
  expect(tree).toMatchSnapshot();
});
