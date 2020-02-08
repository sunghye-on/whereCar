/* main Server Source */

// 환경변수를 불러옵니다.
require('dotenv').config();
const { 
  PORT: port
} = process.env;

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');

const api = require('./api');
const db = require('./db');
const jwtMiddleware = require('./lib/middlewares/jwtMiddleware');

db.connect();
const app = new Koa();
app.use(helmet());
app.use(jwtMiddleware);
app.use(bodyParser());

const router = new Router();
/* /... */
router.use('/api', api.routes());

// middleware
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`✅  heurm server is listening http://localhost:${port}`);
});
