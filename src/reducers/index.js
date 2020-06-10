import { combineReducers } from 'redux';
import triviaInfoReducer from './triviaInfoReducer';
import userInfoReducer from './userInfoReducer';

const rootReducer = combineReducers({
  triviaInfo: triviaInfoReducer,
  userInfo: userInfoReducer,
});

export default rootReducer;
