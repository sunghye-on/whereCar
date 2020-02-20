const Router = require('koa-router'); 
const myListCtrl = require('./myList.ctrl');

const myList = new Router();

/* /api/v1.0/auth */
myList.get('/', (ctx) => {
  ctx.body = '✅ Welcome to myLists!!';
});
myList.get('/drivers', myListCtrl.getLists); 

module.exports = myList;