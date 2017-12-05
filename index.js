
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

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use((err, req, res) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error', { title: 'Error', message: err.message });
// });

// app.listen(3000, () => console.log('Example app listening on port 3000!'));

const server = http.createServer(app);

server.listen(port, (error) => {
  if (error) {
    // winston.log(error);
  } else {
    // open(`http://localhost:${port}`);
  }
});

module.exports = server;
