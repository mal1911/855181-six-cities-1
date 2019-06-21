import React from "react";
import renderer from "react-test-renderer";
import ErrorMessage from "./error-message";

it(`ErrorMessage correctly renders`, () => {
  const tree = renderer
    .create(<ErrorMessage
      message={`Error`}
      onToggle={jest.fn()}
      opened={true}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
