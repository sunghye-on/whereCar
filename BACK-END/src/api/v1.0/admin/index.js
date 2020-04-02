const Router = require('koa-router'); 

const admin = new Router();
const adminCtrl = require('./admin.ctrl');

/* /api/v1.0/admin */
admin.get('/', (ctx) => {
  ctx.body = '✅ Welcome to admin!!';
});

// 그룹에 속한 유저들 확인하기
admin.get('/users', adminCtrl.groupUsers);

// 그룹에 속한 매니저들 확인하기
admin.get('/managers', adminCtrl.groupManagers);

// 매니저권한 새로부여 및 수정
admin.post('/managers', adminCtrl.updateManagers);

module.exports = admin;