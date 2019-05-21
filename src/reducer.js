const initialState = {
  activeCityId: 1,
};
/*
const isArtistAnswerCorrect = (userAnswer, question) =>
  userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (userAnswer, question) =>
  userAnswer.every((it, i) => it === (
    question.answers[i].genre === question.genre
  ));
*/

const ActionCreator = {
  changeActiveCity: (activeCityObj) => ({
    type: `CHANGE_ACTIVE_CITY`,
    payload: activeCityObj.id,
  }),

  /*
    incrementStep: () => ({
      type: `INCREMENT_STEP`,
      payload: 1,
    }),

    incrementMistake: (userAnswer, question, mistakes, maxMistakes) => {
      let answerIsCorrect = false;

      switch (question.type) {
        case `artist`:
          answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
          break;
        case `genre`:
          answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
          break;
      }

      if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
        return {
          type: `RESET`,
        };
      }

      return {
        type: `INCREMENT_MISTAKES`,
        payload: answerIsCorrect ? 0 : 1,
      };
    },*/
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_ACTIVE_CITY`: return Object.assign({}, state, {
      activeCityId: action.payload,
    });
/*
    case `INCREMENT_MISTAKES`: return Object.assign({}, state, {
      mistakes: state.mistakes + action.payload,
    });

    case `RESET`: return Object.assign({}, initialState);*/
  }

  return state;
};


export {
  ActionCreator,
  reducer,
};
