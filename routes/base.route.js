const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
  res.render('base/home');
});

router.get('/500', function(req,res) {
  res.render('shared/500');
});

router.get('/401', function(req, res) {
  res.render('shared/401');
});

router.get('/403', function(req, res) {
  res.render('shared/403');
});

module.exports = router;