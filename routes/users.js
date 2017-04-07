var express = require('express');
var router = express.Router();

/* GET login page. */
exports.getLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.str = "hello";

module.exports = router;
