const GroupInfo = require('db/models/GroupInfo');

// 코스id를 이용하여 코스 찾아오기.
exports.searchGroupByQuery = async (ctx) => {
  const { user } = ctx.request;
  const { keywords } = ctx.query;
  // user session이 없다면
  if(!user) {
    ctx.status = 403;
    ctx.body = 'Any session not founded!';
    // eslint-disable-next-line no-useless-return
    return;
  }
  try {
    // const course = await Course.findById({ _id: id });
    // response message(=data)
    const groups = await GroupInfo.searchGroupByKeyword({ keywords });
    ctx.body = {
      groups
    };
  } catch (error) {
    ctx.throw(error);
  }
};