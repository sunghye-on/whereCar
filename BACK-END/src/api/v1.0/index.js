const Router = require('koa-router'); 
const auth = require('./auth');
const gps = require('./gps');
const myList = require('./myList');
const admin = require('./admin');

const api = new Router();

/* /api/v1.0/... */
api.use('/auth', auth.routes());
api.use('/gps', gps.routes());
api.use('/mylist', myList.routes());
api.use('/admin', admin.routes());

module.exports = api;