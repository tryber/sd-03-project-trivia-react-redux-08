import { combineReducers } from 'redux';
import userInfoReducer from './userInfoReducer';
import triviaInfoReducer from './triviaInfoReducer';
import gameInfoReducer from './gameInfoReducer';

const rootReducer = combineReducers({
  triviaInfo: triviaInfoReducer,
  userInfo: userInfoReducer,
  gameInfo: gameInfoReducer,
});

export default rootReducer;
