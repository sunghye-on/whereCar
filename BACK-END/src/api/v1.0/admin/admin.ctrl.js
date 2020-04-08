const Joi = require('joi');
const User = require('db/models/User');
const GroupInfo = require('db/models/GroupInfo');
const CarInfo = require('db/models/CarInfo');
const Admin = require('db/models/Admin');

// 그룹에 속한 유저들 정보가져오기, 그룹에 대한 관리자권한만 접근
exports.groupUsers = async (ctx) => {
  const { user } = ctx.request;
  // find admin
  const admin = await Admin.findByUser(user);
  // user session또는 관리자 권한이 없다면
  if(!user || !admin) {
    ctx.status = 403;
    ctx.body = 'Any session not founded!';
    // eslint-disable-next-line no-useless-return
    return;
  }
  // GroupInfo DB에서 유저들정보 가져오기.
  try {
    const group = await GroupInfo.findOne({ _id: admin.group });
    ctx.body = {
      groupUsers: group.users,
      admin: admin
    };
  } catch (error) {
    ctx.throw(error);
  }
};

// 그룹에 속해있는 매니저들 찾아오기.
exports.groupManagers = async (ctx) => {
  const { user } = ctx.request;

  try {
    // find admin
    const admin = await Admin.findByUser(user);
    // find GroupInfo
    const groupInfo = await GroupInfo.findOne({ _id: admin.group });
    // user session또는 관리자 권한이 없다면
    if(!user || !admin) {
      ctx.status = 403;
      ctx.body = 'Any session not founded!';
      // eslint-disable-next-line no-useless-return
      return;
    }
    // response message(=data)
    ctx.body = {
      Users: await User.findByIds(groupInfo.users),
      Drivers: await User.findByIds(groupInfo.drivers)
    };
  } catch (error) {
    ctx.throw(error);
  }
};

// 그룹원들 역할 수정하기 찾아오기.
exports.updateManagers = async (ctx) => {
  const { user, body } = ctx.request;
  try {
    // find admin
    const admin = await Admin.findByUser(user);
    // user session또는 관리자 권한이 없다면
    if(!user || !admin) {
      ctx.status = 403;
      ctx.body = 'Any session not founded!';
      // eslint-disable-next-line no-useless-return
      return;
    }
    // find GroupInfo
    const groupInfo = await GroupInfo.findOne({ _id: admin.group });

    let { users, drivers } = groupInfo;
    const { Users, Drivers } = body;
    
    const beforeMembers = Users.concat(Drivers);
    for (const i in body) {
      if(i === 'Users') {
        const rest = users.filter(value => beforeMembers.indexOf(value) !== -1);
        users = [...rest, ...body[i]];
      } else {
        const rest = drivers.filter(value => beforeMembers.indexOf(value) !== -1);
        drivers = [...rest, ...body[i]];
      }
    }
    // update query 날리기
    await GroupInfo.updateManagers({ _id: groupInfo._id, users, drivers });
    // response message(=data)
    ctx.body = {
      managers: {
        Users: groupInfo.users,
        Drivers: groupInfo.drivers
      }
    };
  } catch (error) {
    ctx.throw(error);
  }
};

// 그룹에 속해있는 드라이버 찾아오기.
exports.groupDrivers = async (ctx) => {
  const { user } = ctx.request;
  // find admin
  const admin = await Admin.findByUser(user);
  // user session또는 관리자 권한이 없다면
  if(!user || !admin) {
    ctx.status = 403;
    ctx.body = 'Any session not founded!';
    // eslint-disable-next-line no-useless-return
    return;
  }
  try {
    
  } catch (error) {
    ctx.throw(error);
  }
};

// 특정그룹에서 자동차 등록하기
exports.driverRegister = async (ctx) => {
  // const { user, body } = ctx.request;
  const { user, body, file } = ctx.request;
  console.log("=========================test");
  console.log(ctx.request.file);
  console.log(body);
  console.log(body.carName);
  // find admin
  const admin = await Admin.findByUser(user);
  // user session또는 관리자 권한이 없다면
  if(!user || !admin) {
    ctx.status = 403;
    ctx.body = 'Any session not founded!';
    // eslint-disable-next-line no-useless-return
    return;
  };

  // body에서 받은정보 validation하기
  const schema = Joi.object({
    carName: Joi.string().min(2).max(30).required(),
    carNumber: Joi.string().min(4).max(30),
    seatNumber: Joi.number(),
    inspectionDate: Joi.date()
  });

  const result = Joi.validate(body, schema);
  // Schema error 
  if(result.error) {
    console.log('🔥Schema error', result.error);
    ctx.status = 400;
    ctx.body = 'Schema error';
    // eslint-disable-next-line no-useless-return
    return;
  }
  // recieved Client request data
  const { carName, carNumber, seatNumber, inspectionDate } = body;
  try {
    const carInfo = await CarInfo.carRegister({
      carName,
      carNumber,
      seatNumber,
      inspectionDate,
      carImageUrl: file ? file.path : null,
      group: admin.group
    });
    // response message(=data)
    ctx.body = {
      carInfo
    };
  } catch (error) {
    ctx.throw(error);
  }
};