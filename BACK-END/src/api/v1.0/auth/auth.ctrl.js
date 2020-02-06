const Joi = require('joi');
const User = require('db/models/User');

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
  } catch (error) {
    ctx.throw(500);
  }
};