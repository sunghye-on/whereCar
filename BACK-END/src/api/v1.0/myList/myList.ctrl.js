const dummyLists = [
  {
    id: 0,
    driverName: '홍길동1',
    routes: [
      { locationName: '1', Latitude: '0', longitude: '0' },
      { locationName: '2', Latitude: '0', longitude: '0' },
      { locationName: '3', Latitude: '0', longitude: '0' }
    ],
    currentLoc: { Latitude: '0', longitude: '0' }
  },
  {
    id: 1,
    driverName: '홍길동2',
    routes: [
      { locationName: '1', Latitude: '0', longitude: '0' },
      { locationName: '2', Latitude: '0', longitude: '0' },
      { locationName: '3', Latitude: '0', longitude: '0' }
    ],
    currentLoc: { Latitude: '0', longitude: '0' }
  },
  {
    id: 5,
    driverName: '홍길동5',
    routes: [
      { locationName: '1', Latitude: '0', longitude: '0' },
      { locationName: '2', Latitude: '0', longitude: '0' },
      { locationName: '3', Latitude: '0', longitude: '0' }
    ],
    currentLoc: { Latitude: '0', longitude: '0' }
  }
];

exports.getLists = (ctx) => {
  ctx.body = {
    driverList: dummyLists
  };
};