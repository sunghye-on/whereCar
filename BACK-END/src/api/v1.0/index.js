const Router = require('koa-router'); 
const auth = require('./auth');
const gps = require('./gps');
const myList = require('./myList');

const api = new Router();

/* /api/v1.0/... */
api.use('/auth', auth.routes());
api.use('/gps', gps.routes());
api.use('/mylist', myList.routes());

module.exports = api;