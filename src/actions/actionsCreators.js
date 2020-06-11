import {
  REQUEST_TRIVIA_QUESTIONS,
  QUESTIONS_REQUEST_SUCESS,
  QUESTIONS_REQUEST_FAILURE,
  SET_USER_LOGIN,
  CORRECT_ANSWER,
  WRONG_ANSWER,
  RESET_GAME,
} from './actions';
import { getTriviaQuestions } from '../services/endpoints_API';

export const requestTriviaQuestions = () => ({
  type: REQUEST_TRIVIA_QUESTIONS,
  loading: true,
});

export const requestSucessful = ({ results }) => ({
  type: QUESTIONS_REQUEST_SUCESS,
  loading: false,
  data: results,
});

export const requestFailed = (error) => ({
  type: QUESTIONS_REQUEST_FAILURE,
  loading: false,
  data: error,
});

export function fetchingTriviaQuestions(token, categoryID, difficulty, type) {
  return (dispatch) => {
    dispatch(requestTriviaQuestions());
    return getTriviaQuestions(
      token,
      categoryID,
      difficulty,
      type,
    ).then((questions) => dispatch(requestSucessful(questions),
      (error) => dispatch(requestFailed(error.message))));
  };
}
export const setUserInfo = (data) => ({
  type: SET_USER_LOGIN,
  data,
});

export const correctAnswer = (score, assertions) => ({
  type: CORRECT_ANSWER,
  score,
  assertions,
});

export const wrongAnswer = () => ({
  type: WRONG_ANSWER,
});

export const resetGame = () => ({
  type: RESET_GAME,
});
