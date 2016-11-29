var JSONdata = require("../JSON/DATA.json");
var mysql = require ('mysql');
// Routes
// =============================================================
module.exports = function(app){

	databaseItemArray = [
		'PublisherName', 
		'Website',
		'BGGpage', 
		'Country', 
		'CatalogSize', 
		'RepresentativeGames', 
		'Kickstarter', 
		'Submissions', 
		'CategoriesOfInterest', 
		'InterestedIn', 
		'ContactMethod', 
		'ContactInfoNames', 
		'ContactInfoEmail', 
		'RecentlyUpdated', 
		'PubPassword'];

	bobAccount = [
		'Bob', 
		'http://www.bob.com', 
		'http://www.bgg.com/bobGAMES',
		'Bobistan', 
		'4', 
		"Bob, Bobs revenge",
		'No', 
		'No', 
		'Bob', 
		'Bob',
		'email',
		'Robert Paulson', 
		'Bob@gmail.com', 
		'2016-11-22', 
		'Bob'];

	var connection = mysql.createConnection({
		host: "ehc1u4pmphj917qf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
		port: 3306,
		user: "d4wg4nszud1ysuv7",
		password: "qw7kivup9lxpbzdg",
		database: "gsw3abjc36mo6i91"
	});

	var a = 'gsw3abjc36mo6i91';
	var b = 'PublisherDirectory';

	connection.connect(function(err){
		if(err){
			console.log("error!", err.stack);
			return;
		}else{
			showAll('gsw3abjc36mo6i91','PublisherDirectory');
			// pushAll("`gsw3abjc36mo6i91`","`PublisherDirectory`", databaseItemArray, bobAccount);
		}
	});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	function showAll(a, b){
		console.log(("SELECT * FROM " + a + (b?".":"") + b));
		var temp= [];
		connection.query("SELECT * FROM " + a + (b?".":"") + b, function(err, res){
			if(err) throw err;
			// var timp = [];
			// console.log(res[0]);
			// console.log();
			for(z=0;z<res.length;z++){
				console.log(res[z]);
				temp.push(res[z]);	
			}
			temp.push(res[z]);
			console.log('done');
			// console.log(temp);
			// timp = res;
			// console.log("timp", timp);

		});
	}

	function pushAll(target, dbName, itemArray, contentArray){
		// console.log("INSERT INTO " + target + "." + dbName + " (" + arrayToString(itemArray, "") + ") VALUES (" + arrayToString(contentArray, "'") + ");" );
		
		connection.query("INSERT INTO " + target + "." + dbName + " (" + arrayToString(itemArray, "") + ") VALUES (" + arrayToString(contentArray, "'") + ");" )
	}

	function arrayToString(array, quotationMarkType){
		var returnString = ""
		for(x=0;x<array.length;x++){
			if(x==array.length-1){
				returnString += quotationMarkType + array[x] + quotationMarkType;
			}else{
				returnString += quotationMarkType + array[x] + quotationMarkType + ", ";
			}
		}
		// console.log(returnString);
		return returnString;
	}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	// Search for Specific Character (or all characters) then provides JSON
	app.get('/api/data', function(req, res){
		console.log('data');
		res.json(JSONdata);

	});

	// If a user sends data to add a new character...
	app.post('/api/newEntry', function(req, res){


		console.log(req.body);
		console.log('newEntry');
		pushAll("`gsw3abjc36mo6i91`","`PublisherDirectory`", databaseItemArray, bobAccount);
		res.json({"You":"Did it!"});

	});

	// app.get('/api/returnDB', function(req, res){
	// 	console.log('returnDB');
	// 	res.send(showAll('gsw3abjc36mo6i91','PublisherDirectory'));
	// });

	app.get('/api/returnDB', function(req, res){
		// res.json(showAll('gsw3abjc36mo6i91','PublisherDirectory'));
		var res2 = res;

		console.log(("SELECT * FROM " + a + (b?".":"") + b));

		var temp= [];

		connection.query("SELECT * FROM " + a + (b?".":"") + b, function(err, res){
			if(err) throw err;

			for(z=0;z<res.length;z++){
				delete res[z].PubPassword;
				console.log(res[z]);
				temp.push(res[z]);	
			}

			res2.json(temp);
		});
	});

	app.post('/api/populateDB', function(req, res){
		console.log('populateDB');

		// console.log("req", req);
		console.log("req.body", req.body);
		// pushAll("`gsw3abjc36mo6i91`","`PublisherDirectory`", databaseItemArray, bobAccount);
		res.json({"You":"Did it!"});


		var post = req.body;



		connection.query("INSERT INTO " +a + (b?".":"") + b + " SET ?", post, function(err, result){
			console.log(result);
		});

	});


}
