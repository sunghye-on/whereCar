const Router = require('koa-router'); 
const multer = require('@koa/multer');
const path = require('path');

const admin = new Router();
const adminCtrl = require('./admin.ctrl');

// file 업로드를 위함 ( 저장위치 : uploads/cars/ 폴더 )
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/cars/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  })
});

/* /api/v1.0/admin */
admin.get('/', (ctx) => {
  ctx.body = '✅ Welcome to admin!!';
});

// 그룹에 속한 유저들 확인하기
admin.get('/users', adminCtrl.groupUsers);

// 그룹에 속한 매니저들 확인하기
admin.get('/managers', adminCtrl.groupManagers);

// 매니저권한 새로부여 및 수정
admin.post('/managers', adminCtrl.updateManagers);

// 자동차 등록
admin.post('/car/register', upload.single('carImage'), (ctx) => {
  ctx.body = '✅ 자동차 등록하기위한 URI';
});

module.exports = admin;