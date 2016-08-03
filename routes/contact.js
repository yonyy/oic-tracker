var express = require('express');
var fileUpload = require('express-fileupload');
var router = express.Router();
var app = express();
var mysql = require('../models/index.js');

var filterOutUndefined = function(req, fields) {
	var defined = [];
	for (var i = 0; i < fields.length; i++) {
		if (req.query[fields[i]]) {
			defined.push(fields[i])
		}
	}
	return defined;
}

var filterOutUndefinedBody = function(req, fields) {
	var defined = [];
	for (var i = 0; i < fields.length; i++) {
		if (req.body[fields[i]]) {
			defined.push(fields[i])
		}
	}
	return defined;
}

router.get('/', function(req, res, next) {
	mysql.query('SELECT * FROM contacts', 
		function(err, rows) {
			if (err) {throw err; }
			res.json(rows);
		});
})

router.get('/search/', function(req, res, next) {
	var fields = ['firstName', 'lastName', 'email', 'phone', 'company']
	fields = filterOutUndefined(req, fields);

	var query = 'SELECT * FROM contacts WHERE ';
	var options = '';
	var values = [];

	for (var i = 0; i < fields.length; i++) {
		options += '?? LIKE ?';
		if (i < fields.length - 1) {
			options += ' AND ';
		}
		values.push(fields[i]);
		values.push('%' + req.query[fields[i]] + '%');
	}
	mysql.query(query + options, values, 
		function(err, rows) {
			if (err) {throw err; }
			res.json(rows);
		}
	);
});

router.get('/:id', function(req, res) {
	mysql.query('SELECT * FROM contacts WHERE idContact = ?', [req.params.id],
		function(err, row) {
			if (err) { res.send(err) }
			res.json(row);
		}
	)
});

router.post('/', function(req, res, next) {
	var fields = ['firstName', 'lastName', 'email', 'phone', 'company', 'title', 'website', 'bio', 'notes'];
	fields = filterOutUndefinedBody(req, fields);

	var post = 'INSERT INTO contacts ';
	var col = '(';
	var val = ' VALUES (';
	var values = [];

	for (var i = 0; i < fields.length; i++) {
		col += fields[i];
		val += '?';
		if (i < fields.length - 1) {
			col += ', ';
			val += ', ';
		}
		values.push(req.body[fields[i]]);
	}

	col += ')';
	val += ')';

	mysql.query(post + col + val, values,
		function(err, result) {
			if (err) {res.send(err); }
			res.json(result);
		}
	);
});

router.delete('/:id', function(req, res, next) {
	mysql.query('DELETE FROM contacts WHERE idContact = ?', [req.params.id],
		function(err, result) {
			if (err) { res.send(err); }
			else { res.json(result); }
		});
});

router.put('/:id', function(req, res) {
	var fields = ['firstName', 'lastName', 'email', 'phone', 'company', 'title', 'website', 'bio', 'notes'];
	fields = filterOutUndefinedBody(req, fields);
	var values = [];
	var put = 'UPDATE contacts ';
	var set = 'SET ';
	var where = ' WHERE idContact = ?';

	for (var i = 0; i < fields.length; i++) {
		set += fields[i] + '= ?'; 
		if (i < fields.length - 1) {
			set += ', ';
		}
		values.push(req.body[fields[i]]);
	}

	values.push(req.params.id);
	mysql.query(put + set + where, values,
		function(err, result) {
			if (err) {res.send(err);}
			res.json(result);
		});
});

module.exports = router;