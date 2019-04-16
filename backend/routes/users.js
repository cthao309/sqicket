const express = require('express');
const mysql = require('mysql')

const router = express.Router();
const dbconfig = require('../config/database')

const connection = mysql.createConnection(dbconfig.connection)

// establish connection to mysql database
connection.query(`USE ${dbconfig.database}`)

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({});
});

// POST insert new user into users table
router.post('/', (req, res) => {
  // destructure required form fields from req.body
  const {
    username,
    firstName,
    lastName,
    password,
    email,
    comments,
    roleId,
  } = req.body
  // call mysql stored procedure to insert new user
  connection.query(
    'CALL insertUser(?, ?, ?, ?, ?, ?, ?)',
    [username, firstName, lastName, password, email, comments, roleId],
    (err, responseObject) => {
      // if sql returns an error, send to client as JSON
      if (err) {
        return res.json({
          success: false,
          message: err.sqlMessage,
        })
      }
      // otherwise, extract relevant info from responseObject and send to client
      const returnedData = responseObject[0]
      const user = returnedData[0]
      return res.json({
        success: true,
        message: user.msg,
        user_id: user.userId,
      })
    },
  )
})
module.exports = router;
