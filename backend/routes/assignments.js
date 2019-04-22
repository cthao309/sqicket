const express = require('express')
const sp = require('../storedProcedures/spFunctions')

const router = express.Router();

//
// GET -  retrieve a list of all assignments
//
router.get('/', (req, res) => {
  sp.getAssignment(
    null,
    null,
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
// GET -  retrieve assignments by userId
//
router.get('/user/:userId', (req, res) => {
  sp.getAssignment(
    req.params.userId,
    null,
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
// GET -  retrieve assignments by projectId
//
router.get('/project/:projectId', (req, res) => {
  sp.getAssignment(
    null,
    req.params.projectId,
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
// POST - insert a new assignment
//
router.post('/', (req, res) => {
  // destructure required form fields from req.body
  const {
    userId,
    projectId,
  } = req.body
  sp.insertAssignment(
    userId,
    projectId,
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
// DELETE - delete an assignment
//
router.delete('/', (req, res) => {
  // destructure required form fields from req.body
  const {
    userId,
    projectId,
  } = req.body
  sp.deleteAssignment(
    userId,
    projectId,
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

module.exports = router;
