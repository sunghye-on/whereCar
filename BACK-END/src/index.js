/* main Server Source */

// 환경변수를 불러옵니다.
require('dotenv').config();
const { 
  PORT: port,
  MONGO_URI: mongoUri 
} = process.env;

const Koa = require('koa');
const Router = require('koa-router');

const api = require('./api');
const db = require('./db');

db.connect();
const app = new Koa();

const router = new Router();
/* /... */
router.use('/api', api.routes());

// middleware
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
    console.log(`✅  heurm server is listening http://localhost:${port}`);
});
