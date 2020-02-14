const Joi = require('joi');
const User = require('db/models/User');

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
      displayName,
      _id,
      email,
      metaInfo
    };
  } catch (error) {
    ctx.throw(error);
  }
};

exports.check = (ctx) => {
  const { user } = ctx.request;
  // user session이 없다면
  if(!user) {
    ctx.status = 403;
    ctx.body = 'Any session not founded!';
    return;
  }
  
  ctx.body = {
    ...user,
    metaInfo: {}
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
    // find user
    const user = await User.findByEmail(email);
    if(!user) {
      // user dose not exist
      ctx.status = 409;
      ctx.body = `user[${email}] dose not exist`;
      return;
    }
    // update user data
    const result = await User.updateUser({ displayName, password, email });
    console.log(result);
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