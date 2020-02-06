# whereCar

### 아이디어



### 프로젝트 구성

FRONT-END

* `npx create-react-app FRONT-END`

BACK-END

* webframework
  * `yarn add koa`
  * `yarn add koa-router`
* DB
  * MongoDB
  * `yarn add mongoose`

* SocketIO
  * `yarn add soketIO`
* Server
  * `yarn add --dev nodemon`
  * `yarn add dotenv`

Env

* eslint
  * `yarn add --global eslint`
  * `yarn add eslint`
  * `eslint init`

--------------

BACK-END

joi 사용

`yarn add joi`

bodypaser

`yarn add koa-bodyparser`





secret-key 만들기

```javascript
const crypto = require('crypto');

const password = 'abc123';
const secret = 'MySecretKey1$1$234';

const hashed = crypto.createHmac('sha256', secret).update(password).digest('hex');

console.log(hashed);
```

