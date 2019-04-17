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
  connection.query(
    'CALL getProject(?, ?)',
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
});

//
// GET -  retrieve a single project by id or projectname
//
router.get('/:project', (req, res) => {
  const isNumeric = /^\d+$/.test(req.params.project)
  connection.query(
    'CALL getProject(?, ?)', 
    isNumeric ? [req.params.project, null] : [null, req.params.project],
    (err, responseObject) => {
      // if sql returns an error,  forward to client
      if(err) {
        return res.json({
          success:false,
          message: err.sqlMessage,
        })
      }
      // otherwise, extract relevant info from responseObject and send to client
      const returnedData = responseObject[0]
      return res.json({
        success: true,
        results: returnedData,
      })
    }
  ) 
})
//
// POST - insert a new project into projects table
//
router.post('/', (req, res) => {
  // de-structure required form fields from req.body
  const {
    projectName,
    projectDescription,
    createdByUserId,
  } = req.body
  console.log(projectName,projectDescription,createdByUserId, 'req.body')
  // call mysql stored procedure to insert new project
  connection.query(
    'CALL insertProject(?, ?, ?)',
    [projectName, projectDescription, createdByUserId],
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
// DELETE - mark a project is being deleted
//
router.delete('/', (req, res) => {
  // de-structure projectId from req.body
  const { projectId } = req.body
  // console.log(req.body, 'req.body')
  // call mysql stored procedure to delete user by projectId
  connection.query(
    'CALL deleteProject(?)',
    [projectId],
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
