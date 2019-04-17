const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const bcrypt = require('bcrypt-nodejs')
const PassportLocalStrategy = require('passport-local').Strategy
const dbconfig = require('../config/database')
const jwtConfig = require('../config/jwt')

const connection = mysql.createConnection(dbconfig.connection)

// establish connection to mysql database
connection.query(`USE ${dbconfig.database}`)

module.exports = new PassportLocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    connection.query(
      'CALL getUser(?, ?)',
      [null, username],
      (err, responseObj) => {
        if (err) return done(err)
        const returnedData = responseObj[0]
        // if the user could not be found
        if (!returnedData.length) {
          const error = new Error('User does not exist.')
          error.name = 'IncorrectCredentialsError'
          return done(error)
        }

        const user = returnedData[0]
        // if the user is found but the password is wrong
        if (!bcrypt.compareSync(password, user.password)) {
          const error = new Error('Password incorrect.')
          error.name = 'IncorrectCredentialsError'
          return done(error)
        }

        // all is well, so generate json web token based on user's id and jwt secret phrase
        // and return object with username
        const payload = {
          sub: user.user_id,
        }
        const token = jwt.sign(payload, jwtConfig.jwtSecret)
        const data = {
          userId: user.user_id,
          username: user.username,
          fullName: user.full_name,
          email: user.email,
          lastLoggedInAt: user.last_logged_in_at,
        }

        return done(null, token, data)
      },
    )
  },
)
