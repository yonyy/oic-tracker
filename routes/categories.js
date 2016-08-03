var express = require('express');
var router = express.Router();
var app = express();
var mysql = require('../models/index.js');

router.post('/', function (req, res) {
	var idContact = req.body.idContact;
	var category = req.body.category;
	var values = [idContact, category];

	mysql.query('INSERT INTO categories (idContact, category) VALUES (?, ?)', values,
		function(err, result) {
			if (err) {throw err;}
			res.json(result);
		})
});

module.exports = router;
