// required npm modules
const express = require("express");
const mysql = require("mysql");

const router = express.Router();
const dbconfig = require("../config/database");

const connection = mysql.createConnection(dbconfig.connection)

// establish connection to mysql database
connection.query(`USE ${dbconfig.database}`)

//
// GET -  retrieve a list of all projects
//
router.get('/', (req, res) => {
  res.json({});
});

//
// POST - insert a new project into projects table
//
router.post('/', (req, res) => {
  // de-structure required form fields from req.body
  const {
    name,
    projectDescription,
    createdByUserId,
  } = req.body
  console.log(name,projectDescription,createdByUserId)
  // call mysql stored procedure to insert new project
  connection.query(
    'CALL insertProject(?, ?, ?)',
    [name, projectDescription, createdByUserId],
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
        created_by_user_id: result. createdByUserId,
      })
    },
  )
})

module.exports = router;
