var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/marhba', function(req, res, next) {
  res.json('marhba bikom ness kol');
});

module.exports = router;
