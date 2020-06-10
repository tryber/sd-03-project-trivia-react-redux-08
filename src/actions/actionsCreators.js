import {
  REQUEST_TRIVIA_QUESTIONS,
  QUESTIONS_REQUEST_SUCESS,
  QUESTIONS_REQUEST_FAILURE,
  SET_USER_LOGGIN,
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
  type: SET_USER_LOGGIN,
  data,
});
