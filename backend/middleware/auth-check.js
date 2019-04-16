const dbconfig = require('../config/database')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwt')
const mysql = require('mysql')
const connection = mysql.createConnection(dbconfig.connection)

// establish connection to mysql database
connection.query('USE ' + dbconfig.database)

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }

  const token = req.headers.authorization.split(' ')[1]

  return jwt.verify(token, jwtConfig.jwtSecret, (err, decoded) => {
    if (err) { return res.status(401).end() }
    const userId = decoded.sub

    connection.query(
      'SELECT * FROM users WHERE user_id = ?',
      [userId],
      function(err, rows) {
        // if the user could not be found or some other error occurred
        if (err || !rows.length) {
          return res.status(401).end()
        }

        // all is well, so generate json web token based on user's id and jwt secret phrase
        // and return object with username
        res.locals.userId = rows[0].user_id
        return next()
      }
    )
  })
}
