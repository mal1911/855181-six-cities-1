import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {PopupSortingElement} from "./popup-sorting-element";

it(`PopupSortingElement correctly renders`, () => {
  const tree = renderer
    .create(<BrowserRouter>
      <PopupSortingElement
        opened={true}
        activeOrderIndex={0}
        onToggle={jest.fn()}
        onOrderClick={jest.fn()}
      />
    </BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
