import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Map} from "./map";
import {offersLocationsData} from "../../mocks/mocks";

it(`Map correctly renders`, () => {
  const tree = renderer
    .create(<BrowserRouter>
      <Map
        activeMapLocation={offersLocationsData[0].location}
        className={``}
        offersLocationsData={offersLocationsData}
      />
    </BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
