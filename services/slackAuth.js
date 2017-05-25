const axios = require('axios');
const querystring = require('querystring');


const SLACK_API_URL = 'https://slack.com/api';

module.exports = {

  getAccessToken(code) {
    return axios.post(`${SLACK_API_URL}/oauth.access`,
        querystring.stringify({
          code,
          scope: ['channels:read', 'channels:write', 'channels:history', 'chat:write:user', 'chat:write:bot', 'team:read', 'users:read', 'bot', 'rtm:stream'],
          client_id: '94105311894.149174096865',
          redirect_uri: process.env.SLACK_REDIRECT_URI,
          client_secret: '059f7bea0e6e4558e0b1e5886986382e',
        }))
        .then((response) => {
          if (response.data.ok === true) {
            const accountInfo = response.data;
            const token = response.data.access_token;
            return axios.post(`${SLACK_API_URL}/team.info`, querystring.stringify({ token }))
              .then(({ data }) => Object.assign(accountInfo, data));
          }
        });
  },

  signOut(accessToken) {
    return axios.post(`${SLACK_API_URL}/auth.revoke`,
      querystring.stringify({ token: accessToken }));
  },

};
