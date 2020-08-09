const controllers = require('../controllers')
const url = require('url')

var Linkedin = require('node-linkedin')('78ba2r5rp42j65', 'Aghk7dliUVN3Ayjk', 'http://localhost:3000/oauth/linkedin/callback');
var express = require('express');

var app = express()
    // Initialize 
var scope = ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages'];

var linkedinVariables = {
    'accessToken': null,
    'client': null
}

module.exports = (app) => {
  // Check JWT token before
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers'
    )
    // next();
    const path = url.parse(req.url).pathname
    return next();
  })

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!'
  }))

  // app.get('/api/oauth/linkedin', controllers.linkedin.oauthlogin)
  // app.get('/api/oauth/linkedin/callback', controllers.linkedin.linkedinCallback)
  app.get('/oauth/linkedin', function(req, res) {
    // This will ask for permisssions etc and redirect to callback url. 
    Linkedin.auth.authorize(res, scope);
  });

  app.get('/oauth/linkedin/callback', function(req, res) {
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
          linkedinVariables.client.people.id('HM3nX8nJD6', function(err, $in) {
              console.log($in)
          });
          // return res.redirect('/');
      });
  });
}