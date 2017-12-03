require('dotenv').config();

const config = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
};

module.exports = config;
