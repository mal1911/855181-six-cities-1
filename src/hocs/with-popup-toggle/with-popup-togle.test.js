import React from "react";
import renderer from "react-test-renderer";
import {PopupSortingElement} from "../../components/main/pupup-sorting-element/popup-sorting-element";
import withPopupToggle from "./with-popup-toggle";

describe(`withPopupToggle`, () => {
  it(`renders component correctly`, () => {
    const TogglePopupSortingElement = withPopupToggle(PopupSortingElement);
    const tree = renderer.create(
        <TogglePopupSortingElement/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
