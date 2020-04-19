import React, { useEffect, useState } from 'react';
import { KaKaoMap, KaKaoSearch } from 'components/Map';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mapActions from 'redux/modules/map';
import 'css/kakaoMap.css';

function MapSelector({kakaoMap, pickMarker, kakao, mapResult}) {
  
  const [btn, setBtn] = useState({
      search: true
  });
  const {search} = btn;
  const map = kakaoMap;
  const marker = pickMarker;

  if(mapResult){
    // 지도에 마커를 표시합니다
    marker.setMap(map);
    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
        
      // 클릭한 위도, 경도 정보를 가져옵니다 
      var latlng = mouseEvent.latLng; 
      
      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
      
      var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';
      
      var resultDiv = document.getElementById('clickLatlng'); 
      resultDiv.innerHTML = message;
      
    });
  }
  const searchBtn = () => {
    console.log(search)
    var searchBox = document.getElementById('menu_wrap'); 
    if(search){
        console.log(search)
        searchBox.style.display = "none"
    }else{
        searchBox.style.display = "block"
    }
    setBtn({...btn, search: !btn.search})
}

  return (
    <>
    <button onClick={searchBtn}>위치검색</button>
    <button>승차장에 추가</button>
    <div className="map_wrap">
      <KaKaoMap/>

      <KaKaoSearch id="kakaoSearchBtn"/>
    </div>
    <p><em>지도를 클릭해주세요!</em></p> 
    <div id="clickLatlng"></div>
    </>
  );
};
export default connect(
  (state) => ({
    kakaoMap: state.map.get('map'),
    pickMarker: state.map.get('pickMarker'),
    kakao: state.map.get('kakao'),
    mapResult: state.map.get('result').toJS().map,
  }),
  (dispatch) => ({
    MapActions: bindActionCreators(mapActions, dispatch)
  })
)(MapSelector);