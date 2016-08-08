var express = require('express');
var router = express.Router();
var app = express();
var mysql = require('../models/index.js');

router.post('/', function (req, res) {
	var event = req.body.event;
	var date = req.body.date;
	var title = req.body.title;
	var location = req.body.location;
	var values = [event, date, title, location];

	mysql.query('INSERT INTO activities (event, date, title, location) VALUES (? , ? , ? , ?)', values,
		function (err, result) {
			if (err) {throw err;}
			res.json(result);
		});
});

router.get('/:id', function (req, res) {
	mysql.query('SELECT * FROM activities WHERE idActivity = ? ', [req.params.id],
		function(err, result) {
			if (err) {throw err;}
			res.json(result);
		}
	);
});

router.delete('/:id', function(req, res) {
	mysql.query('DELETE FROM activities WHERE idActivity = ?', [req.params.id],
		function(err, result) {
			if (err) {throw err;}
			res.json(result);
		}
	);
});

module.exports = router;
