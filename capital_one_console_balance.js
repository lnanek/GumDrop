var crypto = require('crypto'); 
var https = require('https')

/* 
 * You can register at https://developer.capitalonelabs.com/ for your application key/secret but here are sample 
 * API_KEY, API_SECRET for examples. 
 * Generally need to use oAuth or Identification API to get user ACCESS_TOKEN, more details 
 * at https://developer.capitalonelabs.com/apis, we have included a sample access token here (for demo purpose ONLY).
 */

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

https.request(options, function(res) { 
         console.log('STATUS: ' + res.statusCode); 
         console.log('HEADERS: ' + JSON.stringify(res.headers)); 
         res.setEncoding('utf8'); 
         res.on('data', function (chunk) {
                   console.log('BODY: ' + chunk); 
        });
}).end();

function randomString(stringLength) { 
         var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'; 
         var randomstring = ''; 
         for (var i=0; i<stringLength; i++) { 
               var rnum = Math.floor(Math.random() * chars.length); 
               randomstring += chars.substring(rnum,rnum+1); 
         } 
         return randomstring; 
}

