//const jwt = require("jsonwebtoken");
const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const PassportLocalStrategy = require("passport-local").Strategy;
const dbconfig = require('../config/database');
const connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = new PassportLocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
  },
  (req, username, password, done) => {
    connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      function(err, rows) {
        if (err) return done(err);
        if (!rows.length) {
          const error = new Error('User does not exist.')
          error.name = 'IncorrectCredentialsError'
          return done(error)
        }

        // if the user is found but the password is wrong
        if (!bcrypt.compareSync(password, rows[0].password)){
          const error = new Error('Password incorrect.')
          error.name = 'IncorrectCredentialsError'
          return done(error)
        }

        // all is well, return successful user
        return done(null, rows[0]);
      }
    );
  }
);
