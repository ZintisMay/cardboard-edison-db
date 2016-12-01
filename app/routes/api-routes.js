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
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	var monthNames = [
	"Jan", 
	"Feb", 
	"Mar", 
	"Apr", 
	"May", 
	"Jun",
	"Jul", 
	"Aug", 
	"Sep", 
	"Oct", 
	"Nov", 
	"Dec"
	];

	Date.prototype.yyyymmdd = function() {
	  var mm = this.getMonth(); // getMonth() is zero-based
	  var dd = this.getDate();

	  return [
	  			(mm>9 ? '' : '0') + monthNames[mm],
	          	(dd>9 ? '-' : '-0') + dd,
	         	"-" + this.getFullYear()
	         ].join('');
	};

	// var date = new Date();
	// console.log(date.yyyymmdd());



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	function checkPW(a, b, PublisherName, PubPassword){

		queryString = "SELECT * FROM " + a + (b?".":"") + b + " WHERE PublisherName = \"" + PublisherName + "\" AND PubPassword = \"" + PubPassword + "\"";

		console.log(queryString);

		connection.query(queryString, function(err, res){
			if(err) throw err;
			console.log(res);
			if(res.length == 1){
				console.log("it's there");
				console.log(res[0]);
				return res[0];
			}else if(res.lengt > 1){
				console.log("multiple entries");
				return res;
			}
			console.log("NOPE");
			// return false;
		});

	}

	function getSingle(a, b, PublisherName, PubPassword){

		queryString = "SELECT * FROM " + a + (b?".":"") + b + " WHERE PublisherName = \"" + PublisherName + "\" AND PubPassword = \"" + PubPassword + "\"";
		console.log("______________________________________________________________________________________________________");		

		console.log(queryString);		

		connection.query(queryString, function(err, res){
			if(err) throw err;
			console.log(res);
			if(res){
				console.log("it's there");
				console.log(res);
				return res;
			}
			console.log("NOPE");
			// return null;
		});

	}

	function showAll(a, b){
		// console.log(("SELECT * FROM " + a + (b?".":"") + b));
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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	// Search for Specific Character (or all characters) then provides JSON
		app.get('/api/data', function(req, res){
			console.log('data');
			res.json(JSONdata);

		});

	// If a user sends data to add a new character...
			// app.post('/api/newEntry', function(req, res){


			// 	console.log(req.body);
			// 	console.log('newEntry');
			// 	pushAll("`gsw3abjc36mo6i91`","`PublisherDirectory`", databaseItemArray, bobAccount);
			// 	res.json({"You":"Did it!"});

			// });

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
				if(res[z].Viewable == 0){
					delete res[z];
				}else{

					delete res[z].PubPassword;	
				}
				console.log(res[z]);
				temp.push(res[z]);	
			}

			res2.json(temp);
		});
	});

	//zintis currently working on making this create new entries
	//make sure you set the public view to 0
	//make sure the data being passed works

	app.post('/api/newPublisher', function(req, res){

		res.json({"You":"Made a new Publisher!"});

		var post = req.body;
		var res2 = res;
		var queryString = "SELECT * FROM " + a + (b?".":"") + b + " WHERE PublisherName = \"" + req.body.PublisherName + "\"";	

		connection.query(queryString, function(err, result){
			if(err) throw err;
			if(result.length == 0){

				connection.query("INSERT INTO " +a + (b?".":"") + b + " SET ?", post, function(err, result){
					if(err) throw err;
					console.log(result);
				});

			};
		});



	});

	app.post('/api/populateDB', function(req, res){

		// console.log('populateDB');

		// console.log("req", req);
		// console.log("req.body", req.body);
		// pushAll("`gsw3abjc36mo6i91`","`PublisherDirectory`", databaseItemArray, bobAccount);
		res.json({"You":"Did it!"});

		var post = req.body;

		connection.query("INSERT INTO " +a + (b?".":"") + b + " SET ?", post, function(err, result){
			if(err) throw err;

			console.log(result);
		});

	});

	app.post('/api/checkPW', function(req, res){
		console.log(req.body);
		console.log(req.body.PublisherName);
		console.log(req.body.PubPassword);

		res = checkPW(a, b, req.body.PublisherName, req.body.PubPassword);
	});

	app.post('/api/getSingle', function(req, res){
		
		console.log(req.body);

		var queryString = "SELECT * FROM " + a + (b?".":"") + b + " WHERE PublisherName = \"" + req.body.PublisherName + "\" AND PubPassword = \"" + req.body.PubPassword + "\"";	
		
		var res2 = res;

		var temp = {};
		
		console.log(queryString);		

		connection.query(queryString, function(err, res){
			if(err) throw err;

			console.log(res);

			if(res.length == 0){
				temp = {ERROR:"Incorrect Name or Password"};
			}else{
				temp = res[0];	
			}
			res2.json(temp);
			console.log(temp);

		});
		
	});

	app.post('/api/updateSingle', function(req, res){

		console.log("updateSingle");
		console.log(req.body);

		var passwordHolder = req.body.NewPassword;

		delete req.body.NewPassword;

		var tempString = "UPDATE " + a + (b?".":"") + b + " SET "
		for(var key in req.body){

			if(key == "PubPassword" && passwordHolder != ""){

				tempString += key;
				tempString += "='";
				tempString += passwordHolder;
				tempString += "', ";

			}else if(key == "NewPassword"){

			}else if(key == "RecentlyUpdated"){

				var date = new Date();
				tempString += key;
				tempString += "='";
				tempString += date.yyyymmdd();
				tempString += "', ";

			}else{

				tempString += key;
				tempString += "='";
				tempString += req.body[key];
				tempString += "', ";

			}

		}

		queryString = tempString.slice(0, -2);

		queryString+= " WHERE PublisherName = \"" + req.body.PublisherName + "\" AND PubPassword = \"" + req.body.PubPassword + "\"";	
		
		console.log(queryString);

		var res1 = res;
		var res2;
		connection.query(queryString, function(err, res){
			if(err) throw err;
			console.log(res);

		res2 = res;

		})

		res1;

	});


}
