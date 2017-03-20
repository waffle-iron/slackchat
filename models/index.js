const conn = require('./../services/connections');


module.exports = {

  addAccount(accountInfo, cb) {
    const accounts = conn.db.collection('accounts');
    delete accountInfo.ok;
    accounts.replaceOne({team_id: accountInfo.team_id}, accountInfo, {upsert: true}, (err, result) => {
      if (err) { return cb(err); }
      console.log(result);
      cb(result.ops[0]);
    });
  },

  getAccounts(cb) {
    const accounts = conn.db.collection('accounts');
    accounts.find({}).toArray((err, docs) => {
      if (err) { return cb(err); }
      cb(docs);
    });
  },

  getAccount({team_id}, cb) {
    const accounts = conn.db.collection('accounts');
    accounts.find({team_id}).toArray((err, docs) => {
      if (err) { return cb(err); }
      cb(docs[0]);
    });
  }

}