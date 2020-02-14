const Router = require('koa-router'); 

const auth = new Router();
const authCtrl = require('./auth.ctrl');

/* /api/v1.0/auth */
auth.get('/', (ctx) => {
  ctx.body = '✅ Welcome to auth!!';
});
auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);
auth.get('/exists/:key(email|displayName)/:value', authCtrl.exists);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);
auth.post('/profile', authCtrl.updateUser); // profile update
auth.get('/profile'); // profile Read

module.exports = auth;