const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwt')
const sp = require('../storedProcedures/spFunctions')

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }

  const token = req.headers.authorization.split(' ')[1]

  return jwt.verify(token, jwtConfig.jwtSecret, (jwtErr, decoded) => {
    if (jwtErr) { return res.status(401).end() }
    const userId = decoded.sub

    sp.getUser(
      userId,
      null,
      (sqlErr, responseObject) => {
        // if the user could not be found or some other error occurred
        if (sqlErr || !responseObject.length) {
          return res.status(401).end()
        }

        // all is well, so add users id to res.locals in case its needed downstream
        const returnedData = responseObject[0]
        res.locals.loggedInUserId = returnedData[0].user_id
        return next()
      },
    )
  })
}
