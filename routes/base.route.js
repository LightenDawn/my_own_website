const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
  res.render('base/home');
});

module.exports = router;