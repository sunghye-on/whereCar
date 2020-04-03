const Joi = require('joi');
const User = require('db/models/User');
const GroupInfo = require('db/models/GroupInfo');
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
