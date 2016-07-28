var express = require('express');
var router = express.Router();
var app = express();
var mysql = require('../models/index.js');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var path = require('path');
router.use(fileUpload());

router.post('/', function(req, res) {
	if (!req.files) {
		res.send('No files were uploaded.');
		return;
	}
	var filename = req.files.file.name;
	console.log('filename: ' + filename);
	var location = 'views/img/profile_pictures/' + filename;
	fs.writeFile(location, req.files.file.data, (err) => {
		mysql.query('UPDATE contacts SET image = ? WHERE idContact = ?', [filename, req.body.idContact],
			function(err, result) {
				if (err) {res.send('Error'); }
				else {res.send('It is saved')};
			});
	});
});

module.exports = router;