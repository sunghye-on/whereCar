import { handleActions, createAction } from 'redux-actions';

import { Map, List } from 'immutable';
import * as AuthAPI from 'lib/api/auth';
import * as MyListAPI from 'lib/api/myList';
import { pender } from 'redux-pender';

const GET_CARS = 'car/GET_CARS'; // car list 받아오기
const GET_CAR = 'car/GET_CAR'; // car 받아오기

export const getCars = createAction(GET_CARS, MyListAPI.getCars); // groupId
export const getCar = createAction(GET_CAR, MyListAPI.getCar); // carId

const initialState = Map({
  carInfo: Map({
    groupInfo: Map({}),
    carList: List([])
  }),
  courseInfo: Map({
    groupInfo: Map({}),
    memberInfo: Map({}),
    courseList: List([])
  }),
  result: Map({})
})

export default handleActions({
  ...pender({
    type: GET_CARS,
    onSuccess: (state, action) => state.set('carInfo', action.payload.data),
    onFailure: (state, action) => initialState
  }),
  ...pender({
    type: GET_CAR,
    onSuccess: (state, action) => state.set('result', Map(action.payload.data)),
    onFailure: (state, action) => initialState
  })
}, initialState);