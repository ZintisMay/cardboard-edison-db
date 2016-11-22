// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path 		= require('path');


// Routes
// =============================================================
module.exports = function(app){

	// Each of the below routes just handles the HTML page that the user gets sent to.
	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/index.html'));
	});

	app.get('/CEangularTable', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/CEangularTable.html'));
	});

	app.get('/jsontest', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/jsontest.html'));
	});

	app.get('/CEangularNewCompany', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/CEangularNewCompany.html'));
	});

	app.get('/Table', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/Table.html'));
	});

	app.get('/Table2', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/Table2.html'));
	});

	app.get('/Table3', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/Table3.html'));
	});

}
