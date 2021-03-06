var express = require('express');
var logfmt = require("logfmt");
var crypto = require('crypto'); 
var https = require('https')
var request = require('request');
var async = require('async');

// Generate random string to add to a request to prevent replay attacks
function randomString(stringLength) { 
         var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'; 
         var randomstring = ''; 
         for (var i=0; i<stringLength; i++) { 
               var rnum = Math.floor(Math.random() * chars.length); 
               randomstring += chars.substring(rnum,rnum+1); 
         } 
         return randomstring; 
}

var app = express();

// Serve static files
app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});


app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});

app.get('/', function(req, res){
  res.send(' you read the root ');
});

app.get('/capital_one', function(req, res){

	var apiKey = '25jweQheWUtGDGjLfQJ3jEhY'; 
	var  apiSecret = 'Vwx8dXMoyOhHC8tC'; 
	var  accessToken = 'VUQsnQtY8YcPbhL3YcBWKzxt';
	var url = 'api-sandbox.capitalone.com';

	var timestamp = Math.floor((new Date().getTime()) / 1000); 
	var nonce = randomString(30); 
	var toHash = apiKey.concat(apiSecret).concat(nonce).concat(timestamp); 
	var hash = crypto.createHash('sha256').update(toHash).digest("hex"); 
	var signature = hash.toString();

	var options = { 
				 host: url, 
					port:443, 
					path: '/rewards/v1/balance', 
					method: 'GET', 
					headers: { 
									 "Api-Key": apiKey, 
									 "Authorization": "Bearer " + accessToken, 
									 "Accept": "application/json", 
									 "Content-Type": "application/json", 
									 "Signature": "nonce=\""+nonce+"\", timestamp=\""+timestamp+"\", method=\"HMAC-SHA256\", signature=\""+signature+"\"" 
					} 
	};

	https.request(options, function(serviceResponse) { 
					 console.log('STATUS: ' + serviceResponse.statusCode); 
					 console.log('HEADERS: ' + JSON.stringify(serviceResponse.headers)); 
					 serviceResponse.setEncoding('utf8'); 
					 serviceResponse.on('data', function (chunk) {
										 console.log('BODY: ' + chunk); 
										 
										 res.header("Content-Type", "application/json");
										 res.end('' + chunk); 
					});
	}).end();

  //res.send('Hello Capital One');
});

var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
  console.log("Listening on " + port);
});


