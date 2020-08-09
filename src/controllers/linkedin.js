var Linkedin = require('node-linkedin')('78ba2r5rp42j65', 'Aghk7dliUVN3Ayjk', 'http://localhost:3000/api/oauth/linkedin/callback');
var express = require('express');

var app = express()
    // Initialize 
var scope = ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages'];

var linkedinVariables = {
    'accessToken': null,
    'client': null
}

module.exports = {
  async oauthlogin (req, res) {
    // This will ask for permisssions etc and redirect to callback url. 
    Linkedin.auth.authorize(res, scope);
  },

  async linkedinCallback (req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
      if (err)
          return console.error(err);

      console.log(results);

      linkedinVariables.accessToken = results.access_token;

      console.log("ACCESS TOKEN IS ", linkedinVariables.accessToken);

      linkedinVariables.client = Linkedin.init(linkedinVariables.accessToken);

  /*  linkedinVariables.client.people.me(function(err, $in) {
          console.log($in);
      });*/

/*linkedinVariables.client.people.me('linkedin_id', ['id', 'first-name', 'last-name'], function(err, $in) {
  // Loads the profile by id.
  console.log($in);
});*/
      linkedinVariables.client.people.me('linkedin_id', ['id', 'first-name', 'last-name'], function(err, $in) {
        // Loads the profile by id.
        console.log($in);
    });
      // return res.redirect('/');
    });
  }
}