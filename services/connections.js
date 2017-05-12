const mongoose = require('mongoose')
const MONGO_URL = "mongodb://dharness:bluecakes@ds137090.mlab.com:37090/chindow";


function connect() {
  return mongoose.connect(MONGO_URL)
}

module.exports = { connect };