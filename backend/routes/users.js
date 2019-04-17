const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt-nodejs')
const dbconfig = require('../config/database')

const router = express.Router();
const connection = mysql.createConnection(dbconfig.connection)

// establish connection to mysql database
connection.query(`USE ${dbconfig.database}`)

//
// GET -  retrieve a list of all users
//
router.get('/', (req, res) => {
  connection.query(
    'CALL selectUser(?, ?)',
    [null, null],
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
      return res.json({
        success: true,
        results: returnedData,
      })
    },
  )
})

//
// GET -  retrieve a single user by id or username
//
router.get('/:user', (req, res) => {
  const isNumeric = /^\d+$/.test(req.params.user)
  connection.query(
    'CALL selectUser(?, ?)',
    isNumeric ? [req.params.user, null] : [null, req.params.user],
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
      return res.json({
        success: true,
        results: returnedData,
      })
    },
  )
})

//
// POST - insert a new user
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
  const hashedPassword = bcrypt.hashSync(password, null, null)
  // call mysql stored procedure to insert new user
  connection.query(
    'CALL insertUser(?, ?, ?, ?, ?, ?, ?)',
    [username, firstName, lastName, hashedPassword, email, comments, roleId],
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
        success: !!result.success,
        message: result.msg,
        userId: result.userId,
      })
    },
  )
})

//
// PUT - update a user
//
router.put('/', (req, res) => {
  // destructure required form fields from req.body
  const {
    userId,
    username,
    firstName,
    lastName,
    password,
    email,
    comments,
    roleId,
  } = req.body
  const hashedPassword = bcrypt.hashSync(password, null, null)
  // call mysql stored procedure to insert new user
  connection.query(
    'CALL updateUser(?, ?, ?, ?, ?, ?, ?, ?)',
    [userId, username, firstName, lastName, hashedPassword, email, comments, roleId],
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
        success: !!result.success,
        message: result.msg,
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
