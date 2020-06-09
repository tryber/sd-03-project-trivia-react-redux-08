import { combineReducers } from 'redux';
import triviaInfoReducer from './triviaInfoReducer';

const rootReducer = combineReducers({ triviaInfoReducer });

export default rootReducer;
