import React from "react";
import {shallow} from "enzyme";
import {SignInPage} from "./sign-in-page";

const mockEvent = {
  preventDefault() {
  }
};
describe(`e2e test SignInPage`, () => {
  it(`Simulating SignInPage submit`, () => {
    const handleSubmit = jest.fn();

    const form = shallow(
        <SignInPage
          userInfo={{emain: `Oliver.conner@gmail.com`, password: `12345`}}
          isAuthorizationRequired={true}
          onUserLogin={handleSubmit}
        />
    );

    const loginForm = form.find(`.login__form`);
    loginForm.simulate(`submit`, mockEvent);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

});
