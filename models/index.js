var mysql = require('mysql');
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

var con = mysql.createConnection({
	host: ip,
	user: 'root',
	password: '!nv3ntUcsd',
	database: 'researcher'
});

con.connect(function(err){
	if (err) {
		console.log('Error connecting to Db');
		return;
	}
	console.log('Connection Established::'+ip);
});

module.exports = con;
