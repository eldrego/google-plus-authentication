const google = require('googleapis');
const express = require('express');

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL,
);

const getAuthUrl = () => {
  // generate a url that asks permissions for Google+ and Google Calendar scopes
  const scopes = [
    'https://www.googleapis.com/auth/plus.me',
    // 'https://www.googleapis.com/auth/plus.login',
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

module.exports = router;
