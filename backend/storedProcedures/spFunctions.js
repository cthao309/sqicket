const mysql = require('mysql')
const dbconfig = require('../config/database')
const spNames = require('./spNames')

// establish connection to mysql database
const connection = mysql.createConnection(dbconfig.connection)
connection.query(`USE ${dbconfig.database}`)

module.exports = {
  getUser: (
    userId,
    username,
    cb,
  ) => {
    connection.query(
      spNames.GET_USER,
      [userId, username],
      cb,
    )
  },

  insertUser: (
    username,
    firstName,
    lastName,
    password,
    email,
    comments,
    roleId,
    cb,
  ) => {
    connection.query(
      spNames.INSERT_USER,
      [username, firstName, lastName, password, email, comments, roleId],
      cb,
    )
  },

  updateUser: (
    userId,
    username,
    firstName,
    lastName,
    hashedPassword,
    email,
    comments,
    roleId,
    cb,
  ) => {
    connection.query(
      spNames.UPDATE_USER,
      [userId, username, firstName, lastName, hashedPassword, email, comments, roleId],
      cb,
    )
  },

  deleteUser: (
    userId,
    cb,
  ) => {
    connection.query(
      spNames.DELETE_USER,
      [userId],
      cb,
    )
  },
}
