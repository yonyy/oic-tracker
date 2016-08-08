var express = require('express');
var router = express.Router();
var app = express();
var mysql = require('../models/index.js');

router.post('/', function (req, res) {
	var idContact = req.body.idContact;
	var category = req.body.category;
	var values = [idContact, category];

	mysql.query('INSERT INTO categories (idContact_categories, category) VALUES (?, ?)', values,
		function(err, result) {
			if (err) {throw err;}
			res.json(result);
		})
});

router.get('/:idContact', function(req, res) {
	mysql.query('SELECT * FROM categories WHERE idContact_categories = ?', [req.params.idContact],
		function(err, result) {
			if (err) {throw err;}
			res.json(result);
		}
	);
});

router.delete('/:id', function(req, res) {
	mysql.query('DELETE FROM categories WHERE idCategories = ?', [req.params.id],
		function(err, result) {
			if (err) {throw err;}
			res.json(result);
		}
	);
});

router.put('/:idCategories', function(req, res) {
	mysql.query('UPDATE categories SET category = ? WHERE idCategories = ?', [req.body.category, req.params.idCategories],
		function(err, result) {
			if (err) {throw err;}
			res.json(result)
		}
	);
});

module.exports = router;
