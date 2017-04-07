var firebase = require('firebase');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'TruRecruit' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'SignUp' });
});

module.exports = router;
