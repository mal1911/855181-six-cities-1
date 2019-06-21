import React from "react";
import renderer from "react-test-renderer";
import City from "./city";
import {citiesData} from "../../../mocks/mocks";

it(`City correctly renders`, () => {
  const tree = renderer
    .create(<City
      cityObj={citiesData[0]}
      isActive={true}
      onClick={jest.fn()}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
