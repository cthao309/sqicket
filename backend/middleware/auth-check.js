const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const dbconfig = require('../config/database')
const jwtConfig = require('../config/jwt')

const connection = mysql.createConnection(dbconfig.connection)

// establish connection to mysql database
connection.query(`USE ${dbconfig.database}`)

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }

  const token = req.headers.authorization.split(' ')[1]

  return jwt.verify(token, jwtConfig.jwtSecret, (jwtErr, decoded) => {
    if (jwtErr) { return res.status(401).end() }
    const userId = decoded.sub

    return connection.query(
      'CALL selectUser(?, ?)',
      [userId, null],
      (sqlErr, rows) => {
        // if the user could not be found or some other error occurred
        if (sqlErr || !rows.length) {
          return res.status(401).end()
        }

        // all is well, so generate json web token based on user's id and jwt secret phrase
        // and return object with username
        res.locals.userId = rows[0].user_id
        return next()
      },
    )
  })
}
