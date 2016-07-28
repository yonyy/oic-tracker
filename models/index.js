var mysql = require('mysql');

var con = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '!nv3ntUcsd',
	database: 'researcher'
});

con.connect(function(err){
	if (err) {
		console.log('Error connecting to Db');
		return;
	}
	console.log('Connection Established');
});

module.exports = con;
