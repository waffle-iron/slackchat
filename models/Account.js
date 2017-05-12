const mongoose = require('mongoose');

const Account = mongoose.model('Account', { 
    access_token: String,
    scope: String,
    user_id: String,
    team_name: String,
    team_id: String,
    bot: {
        bot_user_id: String,
        bot_access_token: String
    },
    icon: {
        image_34: String,
        image_44: String,
        image_68: String,
        image_88: String,
        image_10: String,
        image_13: String,
        image_23: String,
    }
});

module.exports = Account;