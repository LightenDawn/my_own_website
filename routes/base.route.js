const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
  res.render('base/home');
});

router.get('/500', function(req,res) {
  res.render('shared/500');
});

module.exports = router;