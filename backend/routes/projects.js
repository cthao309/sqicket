// required npm modules
const express = require('express');

const sp = require('../storedProcedures/spFunctions');

const router = express.Router();

//
// GET -  retrieve a list of all projects
//
router.get('/', (req, res) => {
  sp.getProject(null, null, (err, responseObject) => {
    // if sql returns an error,  forward to client
    if (err) {
      return res.json({
        success: false,
        message: err.sqlMessage,
      });
    }
    // otherwise, extract relevant info from responseObject and send to client
    const returnedData = responseObject[0];
    return res.json({
      success: true,
      results: returnedData,
    });
  });
});

//
// GET -  retrieve a single project by id or project name
//
router.get('/:project', (req, res) => {
  const isNumeric = /^\d+$/.test(req.params.project);
  const args = isNumeric ? [req.params.project, null] : [null, req.params.project];

  sp.getProject(...args, (err, responseObject) => {
    // if sql returns an error,  forward to client
    if (err) {
      return res.json({
        success: false,
        message: err.sqlMessage,
      });
    }
    // otherwise, extract relevant info from responseObject and send to client
    const returnedData = responseObject[0];
    return res.json({
      success: true,
      results: returnedData,
    });
  });
});
//
// POST - insert a new project into projects table
//
router.post('/', (req, res) => {
  // de-structure required form fields from req.body
  const { projectName, projectDescription, createdByUserId } = req.body;
  sp.insertProject(
    projectName,
    projectDescription,
    createdByUserId,
    (err, responseObject) => {
      // if sql returns an error, forward to client
      if (err) {
        return res.json({
          success: false,
          message: err.sqlMessage,
        });
      }
      // otherwise, extract relevant info from responseObject and send to client
      const returnedData = responseObject[0];
      const result = returnedData[0];
      return res.json({
        success: !!result.success,
        message: result.msg,
      });
    },
  );
});

//
// DELETE - mark a project is being deleted
//
router.delete('/', (req, res) => {
  // de-structure projectId from req.body
  const { projectId } = req.body;
  sp.deleteProject(projectId, (err, responseObject) => {
    // if sql returns an error,  forward to client
    if (err) {
      return res.json({
        success: false,
        message: err.sqlMessage,
      });
    }
    // otherwise, extract relevant info from responseObject and send to client
    const returnedData = responseObject[0];
    const result = returnedData[0];
    return res.json({
      success: !!result.success,
      message: result.msg,
    });
  });
});

module.exports = router;
