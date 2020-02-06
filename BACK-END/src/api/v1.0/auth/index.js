const Router = require('koa-router'); 

const auth = new Router();

/* /api/v1.0/auth */
auth.get('/', (ctx) => {
  ctx.body = '✅ Welcome to auth!!';
});

module.exports = auth;