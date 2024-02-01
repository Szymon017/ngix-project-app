const session = require('express-session');
const cookieParser = require('cookie-parser');

module.exports = session({
  secret: 'TwójTajnyKluczSesji',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false } 
});