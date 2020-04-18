import React, { useEffect, useState } from 'react';
import { KaKaoMap, KaKaoMapController } from 'components/Map';
import { AdminContent, ManagerBox, AdminStepper } from 'components/Admin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';
import * as adminActions from 'redux/modules/admin';
import storage from 'lib/storage';
import {isEmail, isLength, isAlphanumeric} from 'validator';
import debounce from 'lodash/debounce';
import Paper from '@material-ui/core/Paper';
import UsersTransferList from './UsersTransferList';
import { makeStyles } from '@material-ui/core';
import * as mapActions from 'redux/modules/map';
const { kakao } = window;

function MapSelector({kakaoMap, example}) {
  console.log("1111========", kakaoMap.map.m?kakaoMap.map:false)
  const map = kakaoMap.map.m?kakaoMap.map:false;
  let marker = null;
  if(map){
    marker = new kakao.maps.Marker({ 
      // 지도 중심좌표에 마커를 생성합니다 
      position: map.getCenter() 
    }); 
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

  return (
    <>
    <KaKaoMap/>
    <p><em>지도를 클릭해주세요!</em></p> 
    <div id="clickLatlng"></div>
    </>
  );
};
export default connect(
  (state) => ({
    kakaoMap: state.map.toJS(),
  }),
  (dispatch) => ({
    MapActions: bindActionCreators(mapActions, dispatch)
  })
)(MapSelector);