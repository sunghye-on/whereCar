import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import { penderReducer } from 'redux-pender';

// reducer들을 하나로 병합하는 function입니다.
export default combineReducers({
    base,
    auth,
    pender: penderReducer 
});