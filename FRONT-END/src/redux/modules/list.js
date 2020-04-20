import { handleActions, createAction } from 'redux-actions';

import { Map, List } from 'immutable';
import * as AuthAPI from 'lib/api/auth';
import * as MyListAPI from 'lib/api/myList';
import { pender } from 'redux-pender';

const GET_CARS = 'list/GET_CARS'; // car list 받아오기
const GET_CAR = 'list/GET_CAR'; // car 받아오기

const DELETE_COURSE = 'list/DELETE_COURSE'; // course 삭제하기
const DELETE_CAR = 'list/DELETE_CAR'; // car 삭제하기

const GET_COURSES = 'list/GET_COURSES'; // course list 받아오기
const GET_COURSE = 'list/GET_COURSE'; // course 받아오기

export const getCars = createAction(GET_CARS, MyListAPI.getCars); // groupId
export const getCar = createAction(GET_CAR, MyListAPI.getCar); // carId
export const deleteCar = createAction(DELETE_CAR, MyListAPI.deleteCar); // carId

export const getCourses= createAction(GET_COURSES, MyListAPI.getCourses); // groupId
export const getCourse = createAction(GET_COURSE, MyListAPI.getCourse); // courseId
export const deleteCourse = createAction(DELETE_COURSE, MyListAPI.deleteCourse); // courseId

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
  myList: Map({
    user: '',
    groupList: List[Map({})]
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
  }),
  
  ...pender({
    type: GET_COURSES,
    onSuccess: (state, action) => state.set('courseInfo', action.payload.data),
    onFailure: (state, action) => initialState
  }),
  ...pender({
    type: GET_COURSE,
    onSuccess: (state, action) => state.set('result', Map(action.payload.data)),
    onFailure: (state, action) => initialState
  }),
  ...pender({
    type: DELETE_COURSE,
    onSuccess: (state, action) => state.set('result', Map(action.payload.data)),
    onFailure: (state, action) => initialState
  })
}, initialState);