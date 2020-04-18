import { handleActions, createAction } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';

const SET_MAP ='map/SET_MAP'
const GET_MAP = 'map/GET_MAP'; // car list 받아오기

export const setMap = createAction(SET_MAP); // Obj(Map)
export const getMap = createAction(GET_MAP); // 없음

const initialState = Map({
  map: Map({}),
  result: Map({})
})

export default handleActions({
  [SET_MAP]: (state, action) => state.set('map', action.payload),
  [GET_MAP]: (state, action) => state.setIn(['header', 'visible'], action.payload)
}, initialState);