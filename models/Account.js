const mongoose = require('mongoose');
const { addCustomer } = require('./../services/payments');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  access_token: String,
  scope: String,
  user_id: String,
  team_name: String,
  team_id: String,
  bot: {
    bot_user_id: String,
    bot_access_token: String,
  },
  team: {
    icon: {
      image_34: String,
      image_44: String,
      image_68: String,
      image_88: String,
      image_10: String,
      image_13: String,
      image_23: String,
    },
  },
  settings: {
    domain: String,
    displayName: String,
    email: String,
    headerColor: String,
  },
  paymentInfo: {
    stripeCustomerId: String,
  },
});

accountSchema.statics.createOrUpdate = function createOrUpdate(accountInfo) {
  const { email } = accountInfo.profile;
  return this.findOne({ team_id: accountInfo.team_id }).then((account) => {
    if (account) { return account; }

    return addCustomer({ email }).then((paymentInfo) => {
      return this.update(
        { team_id: accountInfo.team_id },
        Object.assign({}, accountInfo, { paymentInfo }),
        { upsert: true, overwrite: true });
    });
  });
};

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
