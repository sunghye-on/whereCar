const Router = require('koa-router'); 

const admin = new Router();
const adminCtrl = require('./admin.ctrl');

/* /api/v1.0/admin */
admin.get('/', (ctx) => {
  ctx.body = '✅ Welcome to admin!!';
});

// 그룹에 속한 유저들 확인하기
admin.get('/users', (ctx) => {
  ctx.body = '✅ Welcome to users!!';
});

// 매니저권한 새로부여
admin.post('/manager', (ctx) => {
  ctx.body = '✅ Welcome to manager!!';
});

// 매니저권한 수정
admin.put('/manager', (ctx) => {
  ctx.body = '✅ Welcome to manager!!';
});

module.exports = admin;