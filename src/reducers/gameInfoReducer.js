import {
  CORRECT_ANSWER,
  WRONG_ANSWER,
  RESET_GAME,
} from '../actions/actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const gameInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CORRECT_ANSWER:
      return {
        ...state,
        score: action.score,
        assertions: action.assertions,
      };
    case WRONG_ANSWER:
      return { ...state };
    case RESET_GAME:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default gameInfoReducer;
