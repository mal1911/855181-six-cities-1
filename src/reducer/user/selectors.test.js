import {getUserInfo} from "./selectors";
import {getUserObj} from "../../mocks/mocks";

describe(`get User selector testing`, () => {
  it(`get UserInfo testing`, () => {
    const selected = getUserInfo.resultFunc(getUserObj);
    expect(selected).toEqual({
      email: `Oliver.conner@gmail.com`,
      avatarUrl: `img/1.png`,
    });
  });
});
