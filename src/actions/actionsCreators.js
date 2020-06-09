import {
  REQUEST_TRIVIA_QUESTIONS,
  QUESTIONS_REQUEST_SUCESS,
  QUESTIONS_REQUEST_FAILURE,
} from './actions';
import { getTriviaQuestions } from '../services/endpoints_API';

export const requestTriviaQuestions = () => ({
  type: REQUEST_TRIVIA_QUESTIONS,
  loading: true,
});

export const requestSucessful = ({})