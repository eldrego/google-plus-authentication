const google = require('googleapis');
const express = require('express');
// const jwt = require('jsonwebtoken');

const router = express.Router();
const plus = google.plus('v1');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL,
);

const getAuthUrl = () => {
  // generate a url that asks permissions for Google+ and Google Calendar scopes
  const scopes = [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  return url;
};

router.get('/', (req, res) => {
  const url = getAuthUrl();
  res.render('login', { title: 'Simple Google Authentication', url });
});

router.get('/details', (req, res) => {
  const { code } = req.query;
  oauth2Client.getToken(code, (err, tokens) => {
    if (!err) {
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      oauth2Client.credentials = tokens;
      plus.people.get({
        userId: 'me',
        auth: oauth2Client,
      }, (error, profile) => {
        if (error) {
          return res.render('resolve', {
            title: 'Simple Google Authentication',
            message: 'Authentication Failed',
            status: 'An error occured',
            error,
          });
        }
        return res.render('details', {
          title: 'Simple Google Authentication',
          message: 'Authentication Successful',
          profile,
          image: profile.image.url.split('?')[0],
          email: profile.emails[0].value,
        });
      });
    } else {
      res.render('resolve', {
        title: 'Simple Google Authentication',
        message: 'Authentication Failed',
        status: 'An error occured',
        error: err,
      });
    }
  });
});

module.exports = router;
