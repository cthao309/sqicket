var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({});
});

router.post('/', (req, res, next) => {

  return passport.authenticate('local-login', (err, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success : false,
          message : err.message,
        })
      }

      return res.status(400).json({
        success : false,
        message : 'Could not process the form.',
      })
    }

    return res.json({
      success : true,
      message : 'You have successfully logged in.',
      token,
      user    : userData,
    })
  })(req, res, next)
})


module.exports = router;
