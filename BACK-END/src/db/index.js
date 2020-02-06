const mongoose = require('mongoose');

const {
  MONGO_URI: mongoUri
} = process.env;


module.exports = (() => {
  mongoose.promise = global.Promise;

  return {
    connect() {
      mongoose.createConnection(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(
        () => {
          console.log(`✅  Successfully connected to mongodb!`);
        }
      ).catch(e => {
        console.error(e);
      });
    }
  };
})();