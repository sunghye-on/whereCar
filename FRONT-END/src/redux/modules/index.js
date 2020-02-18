import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import driver from './driverList';
import { penderReducer } from 'redux-pender';

// reducer들을 하나로 병합하는 function입니다.
export default combineReducers({
    base,
    auth,
    user,
    driver,
    pender: penderReducer 
});