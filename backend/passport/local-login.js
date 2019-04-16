const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const bcrypt = require('bcrypt-nodejs')
const PassportLocalStrategy = require('passport-local').Strategy
const dbconfig = require('../config/database')
const jwtConfig = require('../config/jwt')
const connection = mysql.createConnection(dbconfig.connection)

// establish connection to mysql database
connection.query('USE ' + dbconfig.database)

module.exports = new PassportLocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    connection.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      function(err, rows) {
        if (err) return done(err)

        // if the user could not be found
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

        // all is well, so generate json web token based on user's id and jwt secret phrase
        // and return object with username
        const payload = {
          sub: rows[0].user_id,
        }
        const token = jwt.sign(payload, jwtConfig.jwtSecret)
        const data = {
          username: rows[0].username,
        }

        return done(null, token, data)
      }
    )
  }
)
