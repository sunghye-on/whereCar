const jwt = require('jsonwebtoken');
const { JWT_SECRET: secret } = process.env;

function generateToken(payload) {
  return new Promise(
    (resolve, reject) => {
      jwt.sign(payload, secret, {
        issure: 'wherecar.com',
        expiresIn: '7d',
        subject: 'User'
      }, (error, token) => {
        if(error) reject(error);
        resolve(token);
      });
    }
  );
}
exports.generateToken = generateToken;