const MONGO_URL = "mongodb://dharness:bluecakes@ds137090.mlab.com:37090/chindow";
const MongoClient = require('mongodb').MongoClient
let _db;


function connect() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, function(err, db) {
      if (err) { return reject(err); }
      _db = db;
      resolve(_db);
    });
  })
}

module.exports = {
  connect,
  get db() { return _db; }
};