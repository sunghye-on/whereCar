import { handleActions, createAction } from 'redux-actions';

import { Map, List } from 'immutable';

const SET_DRIVER_LIST = 'driver/SET_DRIVER_LIST'; // list 정보 설정 [api 서버에 요청해서 받아옴]
const SET_DRIVER_INFO = 'driver/SET_DRIVER_INFO'; // Driver 정보 설정 [socket으로부터 받아옴]
const SET_DRIVER_STATUS = 'driver/set_DRIVER_STATUS'; // Driver active 상태 설정 [socket 사용]
const SET_DRIVER_CURRENT_LOC = 'driver/SET_DRIVER_CURRENT_LOC'; // Driver 현재위치값 설정 [socket 사용]

export const setDriverList = createAction(SET_DRIVER_LIST); // API
export const setDriverInfo = createAction(SET_DRIVER_INFO); // validated
export const setDriverStatus = createAction(SET_DRIVER_STATUS); 
export const setDriverCurrentLoc = createAction(SET_DRIVER_CURRENT_LOC);

const initialState = Map({
  driverList: List([
    Map({
      displayName: null,
      routes: [],
      currentLoc: null,
      active: false,
      updateAt: null
    })
  ])
})

export default handleActions({
  [SET_DRIVER_STATUS]: (state, action) => state.setIn(['driverList', 0, 'active'], action.payload.data.status),
  [SET_DRIVER_CURRENT_LOC]: (state, action) => state.setIn(['driverList', 0, 'currentLoc'], action.payload.data.currentLoc)
}, initialState);