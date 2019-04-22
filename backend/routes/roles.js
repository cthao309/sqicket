const express = require('express')
const sp = require('../storedProcedures/spFunctions')

const router = express.Router();

//
// GET -  retrieve a list of all roles
//
router.get('/', (req, res) => {
  sp.getRole(
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

module.exports = router;
