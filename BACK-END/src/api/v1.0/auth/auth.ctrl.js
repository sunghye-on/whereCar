const Joi = require('joi');
const User = require('db/models/User');
const token = require('lib/token');

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

    ctx.body = user;
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
  } catch (error) {
    ctx.throw(error);
  }
};