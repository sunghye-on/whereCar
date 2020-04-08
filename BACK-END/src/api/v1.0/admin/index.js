const Router = require('koa-router'); 
const multer = require('@koa/multer');
const path = require('path');
const fs = require('fs');

const admin = new Router();
const adminCtrl = require('./admin.ctrl');

fs.readdir('uploads', (error) => {
  // uploads 폴더 없으면 생성
  if (error) {
    fs.mkdirSync('uploads');
  }
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

// file 업로드를 위함 ( 저장위치 : uploads/ 폴더 )
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
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
admin.post('/car/register', upload.single('carImage'), adminCtrl.driverRegister);

module.exports = admin;