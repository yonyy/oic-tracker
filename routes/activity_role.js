var express = require('express');
var router = express.Router();
var app = express();
var mysql = require('../models/index.js');

router.post('/', function (req, res) {
	var idContact = req.body.idContact;
	var idActivity = req.body.idActivity;
	var role = req.body.role;
	var values = [idContact, idActivity, role];

	mysql.query('INSERT INTO activity_role (idContact, idActivity, role) VALUES (? , ? , ?)', values,
		function(err, result) {
			if (err) {throw err;}
			res.json(result);
		});
});

module.exports = router;
