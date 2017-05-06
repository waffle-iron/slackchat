const conn = require('./../services/connections');
const moment = require("moment");

module.exports = {

  addAccount(accountInfo, cb) {
    return new Promise((resolve, reject) => {
      const accounts = conn.db.collection('accounts');
      delete accountInfo.ok;
      accounts.replaceOne({team_id: accountInfo.team_id}, accountInfo, {upsert: true}, (err, result) => {
        if (err) { return reject(err); }
        resolve(result.ops[0]);
      });
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
  },

  getBotTokens(cb) {
    const accounts = conn.db.collection('accounts');
    accounts.distinct("bot.bot_access_token", (err, tokens) => {
      if (err) { return cb(err); }
      cb(tokens);
    });
  },

  incrementVisitorCount({team_id}, cb) {
    const accounts = conn.db.collection('accounts');
    const today = Number(moment(new Date()).format("YYYYMMDD"));

    accounts.update({team_id: "T2S3395SA", "visitorData.date": today},  {$inc:{"visitorData.$.numVisitors":1}}, (err, docs) => {
      if (err) { return cb(err); }
      else if (err === null && docs.result.nModified === 0) {
        accounts.update({team_id: 'T2S3395SA'}, { "$push": { "visitorData": { "date": today, "numVisitors": 1 }}}, (err, docs) => { cb(err, docs); });
      }
    })

  }

}