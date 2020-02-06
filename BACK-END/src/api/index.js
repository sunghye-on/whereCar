const Router = require('koa-router');
// Version 관리 1.0
const versions = {
  'v1.0': require('./v1.0')
};

const api = new Router();
/* /api/... */
api.use('/v1.0', versions['v1.0'].routes());

module.exports = api;