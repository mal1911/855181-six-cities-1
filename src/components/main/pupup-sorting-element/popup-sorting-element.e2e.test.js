import React from "react";
import {mount} from "enzyme";
import {PopupSortingElement} from "./popup-sorting-element";

const mockEvent = {
  preventDefault() {
  }
};
describe(`e2e test PopupSortingElement`, () => {
  it(`Simulating PopupSortingElement click`, () => {
    const handleClick = jest.fn();
    const element = mount(
        <PopupSortingElement
          opened={true}
          activeOrderIndex={0}
          onToggle={jest.fn()}
          onOrderClick={handleClick}
        />
    );
    const link = element.find(`.places__option.places__option--active`);
    link.simulate(`click`, mockEvent);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
