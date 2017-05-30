const mongoose = require('mongoose');


function connect() {
  mongoose.set('debug', process.env.NODE_ENV !== 'prudction');
  return mongoose.connect(process.env.MONGO_URL);
}

module.exports = { connect };
