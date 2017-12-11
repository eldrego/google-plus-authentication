
require('dotenv').config();
const hbs = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const Session = require('express-session');

const login = require('./routes/login');
const configSession = require('./config/session.js');

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(Session(configSession));

app.engine('.hbs', hbs({ extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use('/', login);

const server = http.createServer(app);

server.listen(port, (error) => {
  if (error) {
    // winston.log(error);
  } else {
    // open(`http://localhost:${port}`);
  }
});

module.exports = server;
