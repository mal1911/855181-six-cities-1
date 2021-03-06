import React from "react";
import renderer from "react-test-renderer";
import {Cities} from "./cities";
import {citiesData} from "../../../mocks/mocks";

it(`Cities correctly renders`, () => {
  const tree = renderer
    .create(<Cities
      citiesData={citiesData}
      activeCityIndex={0}
      onCityClick={jest.fn()}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
