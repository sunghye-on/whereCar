import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mapActions from 'redux/modules/map';

const { kakao } = window;

const KaKaoMap = ({MapActions, kakaoMap}) => {
  const [state, setstate] = useState({
    map: null,
    markers: [],
    infowindows : [],
    appKey: '425dd0fb27495ca0e819752615ac514e' 
  });
  const {map, markers, infowindows, appKey} = state;
  useEffect(() => {
    const container = document.getElementById('kakao-map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    console.log("11111111111===========",map)
    // redux를 이용해 map상태 관리
    MapActions.setMap(map);
    setstate({...state, map})
  }, [])

  return <div id="kakao-map" style={{ height: "100%", minHeight: 500 }}></div>
}

export default connect(
  (state) => ({
    kakaoMap: state.map.toJS(),
  }),
  (dispatch) => ({
    MapActions: bindActionCreators(mapActions, dispatch)
  })
)(KaKaoMap);