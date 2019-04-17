const express = require('express');
const mysql = require('mysql')

const router = express.Router();
const dbconfig = require('../config/database')

const connection = mysql.createConnection(dbconfig.connection)

// establish connection to mysql database
connection.query(`USE ${dbconfig.database}`)

//
// GET -  retrieve a list of all users
//
router.get('/', (req, res) => {
  res.json({});
});

//
// POST - insert a new user into users table
//
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
      // if sql returns an error, forward to client
      if (err) {
        return res.json({
          success: false,
          message: err.sqlMessage,
        })
      }
      // otherwise, extract relevant info from responseObject and send to client
      const returnedData = responseObject[0]
      const result = returnedData[0]
      return res.json({
        success: true,
        message: result.msg,
        user_id: result.userId,
      })
    },
  )
})

//
// DELETE - mark a user a being deleted
//
router.delete('/', (req, res) => {
  // destructure userId from req.body
  const { userId } = req.body
  // call mysql stored procedure to delete user by userId
  connection.query(
    'CALL deleteUser(?)',
    [userId],
    (err, responseObject) => {
      // if sql returns an error,  forward to client
      if (err) {
        return res.json({
          success: false,
          message: err.sqlMessage,
        })
      }
      // otherwise, extract relevant info from responseObject and send to client
      const returnedData = responseObject[0]
      const result = returnedData[0]
      return res.json({
        success: !!result.success,
        message: result.msg,
      })
    },
  )
})
module.exports = router;
