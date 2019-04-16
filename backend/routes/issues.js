const express = require('express');

const router = express.Router();

/* GET issues listing. */
router.get('/', (req, res) => {
  res.json({});
});

module.exports = router;
