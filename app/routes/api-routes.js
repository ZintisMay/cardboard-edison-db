var JSONdata = require("../JSON/DATA.json");

// Routes
// =============================================================
module.exports = function(app){

	// Search for Specific Character (or all characters) then provides JSON
	app.get('/api/data', function(req, res){

		res.json(JSONdata);

	});

	// If a user sends data to add a new character...
	app.post('/api/new', function(req, res){


	})
}
