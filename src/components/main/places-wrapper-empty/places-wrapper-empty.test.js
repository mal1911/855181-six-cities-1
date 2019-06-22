import React from "react";
import renderer from "react-test-renderer";
import {PlacesWrapperEmpty} from "./places-wrapper-empty";
import {citiesData} from "../../../mocks/mocks";

it(`PlacesWrapperEmpty correctly renders`, () => {
  const tree = renderer
    .create(<PlacesWrapperEmpty
      activeCityName={citiesData[0].name}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
