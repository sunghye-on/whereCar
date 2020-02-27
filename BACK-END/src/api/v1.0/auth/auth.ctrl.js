const Joi = require('joi');
const User = require('db/models/User');
const GroupInfo = require('db/models/GroupInfo');
const Admin = require('db/models/Admin');

// local register function
exports.localRegister = async (ctx) => {
  const { body } = ctx.request;

  const schema = Joi.object({
    displayName: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,12}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30)
  });

  const result = Joi.validate(body, schema);
  // Schema error 
  if(result.error) {
    ctx.status = 400;
    ctx.body = 'Schema error';
    return;
  }

  const { displayName, email, password } = body;
  try {
    // check email or displayName existancy
    const exists = await User.findExistancy({ email, displayName })
      .catch(e => console.log(`❌  Error occured at User.findByEmail: ${e}`));
    if(exists) {
      ctx.status = 409;
      const key = exists.email === email ? 'email' : 'displayName';
      ctx.body = {
        message: `Already exists [${key}]` 
      };
      return;
    }
    // creates user account
    const user = await User.localRegister({
      displayName, email, password
    });

    ctx.body = {
      displayName,
      email,
      _id: user._id,
      metaInfo: user.metaInfo
    };

    const accessToken = await user.generateToken()
      .catch(error => console.log(error));

    // configure accessToken to httpOnly cookie || 쿠키설정
    ctx.cookies.set('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }
};

// local login function
exports.localLogin = async (ctx) => {
  const { body } = ctx.request;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30)
  });

  const result = Joi.validate(body, schema);

  // Schema error 
  if(result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { email, password } = body;
  
  // associate with DB handling 
  try {
    // find user
    const user = await User.findByEmail(email);
    // find admin
    const admin = await Admin.findByUser(user);
    
    if(!user) {
      // user dose not exist
      ctx.status = 409;
      ctx.body = `user[${email}] dose not exist`;
      return;
    }

    const validate = user.validatePassword(password);
    if(!validate) {
      // wrong password..
      ctx.status = 403;
      ctx.body = 'Password is not equal!';
      return;
    }
    
    // access token 을 생성한다.
    const accessToken = await user.generateToken();
    // access_token이라는 이름으로 access token 을 발급한다.
    ctx.cookies.set('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    const { _id, displayName, metaInfo } = user;
    ctx.body = {
      loggedInfo: { _id, email, displayName, metaInfo },
      adminInfo: admin || ''
    };
  } catch (error) {
    ctx.throw(error);
  }
};

exports.check = async (ctx) => {
  const { user } = ctx.request;
  // find admin
  const admin = await Admin.findByUser(user);
  // user session이 없다면
  if(!user) {
    ctx.status = 403;
    ctx.body = 'Any session not founded!';
    return;
  }
  
  ctx.body = {
    ...user,
    adminInfo: admin
  };
};

// 이메일 / 아이디 존재유무 확인
exports.exists = async (ctx) => {
  // /exists/:key(email|displayName)/:value
  const { key, value } = ctx.params;
  let user = null;

  try {
    // key 에 따라 findByEmail 혹은 findByDisplayName 을 실행합니다.
    user = await (key === 'email' ? User.findByEmail(value) : User.findByDisplayName(value));
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = {
    exists: user !== null
  };
};

// 로그아웃
exports.logout = (ctx) => {
  ctx.cookies.set('access_token', null, {
    maxAge: 0, 
    httpOnly: true
  });
  ctx.status = 204;
};

// Profile Update
exports.updateUser = async (ctx) => {
  const { body } = ctx.request;

  const schema = Joi.object({
    displayName: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,12}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30)
  });

  const result = Joi.validate(body, schema);
  // Schema error 
  if(result.error) {
    ctx.status = 400;
    ctx.body = 'Schema error';
    return;
  }
  // recieved Client request data
  const { displayName, email, password } = body;
  try {
    const user = await User.findByEmail(email);
    if(!user) {
      // user dose not exist
      ctx.status = 409;
      ctx.body = `user[${email}] dose not exist`;
      return;
    }
    // update user data
    await User.updateUser({ displayName, password, email });
    // send data to client
    ctx.body = {
      displayName,
      email,
      _id: user._id,
      metaInfo: user.metaInfo
    };

    const accessToken = await user.generateToken()
      .catch(error => console.log(error));

    // configure accessToken to httpOnly cookie || 쿠키설정
    ctx.cookies.set('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }
};

// admin register function
exports.adminRegister = async (ctx) => {
  const { body } = ctx.request;

  const schema = Joi.object({
    type: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,12}$/).required(),
    name: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,12}$/).required(),
    location: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,30}$/).required(),
    description: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,30}$/).required(),
    certification: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,30}$/).required(),
    tell: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,16}$/).required()
  });

  const result = Joi.validate(body, schema);
  // Schema error 
  if(result.error) {
    ctx.status = 400;
    ctx.body = 'Schema error';
    return;
  }

  const { type, name, tell, location, description, certification } = body;
  const role = 'super';

  try {
    // check name or location existancy
    const exists = await GroupInfo.findExistancy({ name, location })
      .catch(e => console.log(`❌  Error occured at GroupInfo.findExistancy: ${e}`));
    if(exists) {
      ctx.status = 409;
      const key = exists.name === name ? 'name' : 'location';
      ctx.body = {
        message: `Already exists [${key}]` 
      };
      return;
    }

    // find user obj
    const { user } = ctx.request;
    console.log('user ::: ', user);

    // creates group info
    const group = await GroupInfo.groupRegister({
      type, name, tell, location, description, certification
    });
    // create admin user
    const admin = await Admin.adminRegister({
      role, user, group
    });

    ctx.body = {
      admin
    };
  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }
};