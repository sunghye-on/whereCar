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
    console.log(group.users);
    ctx.body = {
      groupUsers: group.users,
      admin: admin
    };
  } catch (error) {
    ctx.throw(error);
  }
};
