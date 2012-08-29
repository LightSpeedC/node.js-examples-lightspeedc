// http_client.js

var options = {
  host: 'www.google.co.jp',
  port: 80,
  path: '/',
};

var http = require('http');
var util = require('util');

console.log('OPTIONS:');
console.log(util.inspect(options, showHidden=false, depth=null, color=true));
console.log();

http.get(options, function(resp) {
  console.log('STATUS: ' + resp.statusCode);
  console.log();

  //console.log('HEADERS: ' + JSON.stringify(resp.headers));
  console.log('HEADERS: ');
  console.log(util.inspect(resp.headers, showHidden=false, depth=null, color=true));
  console.log();

  resp.setEncoding('utf8');

  resp.on('data', function (chunk) {
    console.log('BODY: data chunk legth='+chunk.length);
    //console.log(chunk);
  });

  resp.on('end', function () {
    console.log('END:');
  });
});
