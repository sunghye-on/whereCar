import { handleActions, createAction } from 'redux-actions';

import { Map, List } from 'immutable';
import * as AuthAPI from 'lib/api/auth';
import * as MyListAPI from 'lib/api/myList';
import { pender } from 'redux-pender';
import storage from 'lib/storage';

const GET_CARS = 'list/GET_CARS'; // car list 받아오기
const GET_CAR = 'list/GET_CAR'; // car 받아오기

const DELETE_COURSE = 'list/DELETE_COURSE'; // course 삭제하기
const DELETE_CAR = 'list/DELETE_CAR'; // car 삭제하기

const GET_COURSES = 'list/GET_COURSES'; // course list 받아오기
const GET_COURSE = 'list/GET_COURSE'; // course 받아오기

const GET_MYLIST = 'list/GET_MYLIST'; // mylist 받아오기

const GROUP_PUSH_REMOVE = 'list/GROUP_PUSH_REMOVE';
const COURSE_PUSH_REMOVE = 'list/COURSE_PUSH_REMOVE';

const GROUP_REGISTER = 'list/GROUP_REGISTER';

export const getCars = createAction(GET_CARS, MyListAPI.getCars); // groupId
export const getCar = createAction(GET_CAR, MyListAPI.getCar); // carId
export const deleteCar = createAction(DELETE_CAR, MyListAPI.deleteCar); // carId

export const getCourses= createAction(GET_COURSES, MyListAPI.getCourses); // groupId
export const getCourse = createAction(GET_COURSE, MyListAPI.getCourse); // courseId
export const deleteCourse = createAction(DELETE_COURSE, MyListAPI.deleteCourse); // courseId

export const getMyList = createAction(GET_MYLIST, MyListAPI.getMyList); // no query & parameter

export const groupPushRemove = createAction(GROUP_PUSH_REMOVE, MyListAPI.groupPushRemove); // groupId
export const coursePushRemove = createAction(COURSE_PUSH_REMOVE, MyListAPI.coursePushRemove); // groupId, courseId

export const groupRegister = createAction(GROUP_REGISTER, MyListAPI.groupRegister) // groupId

const initialState = Map({
  carInfo: Map({
    groupInfo: Map({}),
    carList: List([])
  }),
  courseInfo: Map({
    groupInfo: Map({
      _id: null
    }),
    memberInfo: Map({}),
    courseList: List([])
  }),
  myList: Map({
    user: '',
    groupList: List([])
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
    onSuccess: (state, action) => state.set('courseInfo', Map(action.payload.data)),
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
  }),

  ...pender({
    type: GET_MYLIST,
    onSuccess: (state, action) => {
      // local storage에서 myList 정보 유지
      storage.set('myList', action.payload.data);
      return state.set('myList', Map(action.payload.data));
    },
    onFailure: (state, action) => initialState
  }),

  ...pender({
    type: GROUP_PUSH_REMOVE,
    onSuccess: (state, action) => state.set('result', Map(action.payload.data)),
    onFailure: (state, action) => initialState
  }),
  ...pender({
    type: COURSE_PUSH_REMOVE,
    onSuccess: (state, action) => state.set('result', Map(action.payload.data)),
    onFailure: (state, action) => initialState
  }),

  ...pender({
    type: GROUP_REGISTER,
    onSuccess: (state, action) => state.setIn(['courseInfo', 'memberInfo'], action.payload.data),
    onFailure: (state, action) => initialState
  })
}, initialState);